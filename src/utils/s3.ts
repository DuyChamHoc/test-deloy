import { S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { Request } from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
import { Inject, Service } from 'typedi'
import { Config } from '../configs'
import { Errors } from './error'

const SUPPORTED_IMAGE_TYPES = new Set([
    '.jpeg',
    '.jpg',
    '.png',
    '.heic',
    '.gif',
])
const SUPORTED_VIDEO_TYPES = new Set(['.mp4', '.mov'])

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // mb
const MAX_VIDEO_SIZE = 100 * 1024 * 1024 // mb

const enum FileType {
    image,
    video,
}

@Service()
export class S3Service {
    private s3: S3Client

    constructor(@Inject() private config: Config) {
        const { region, accessKeyId, secretAccessKey } = config.awsConfig
        this.s3 = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        })
    }

    uploadFile(
        dir: string,
        filename: string = null,
        fileType: FileType = FileType.image
    ) {
        return multer({
            fileFilter: this.fileFilter.bind(this, fileType),
            storage: multerS3({
                s3: this.s3,
                bucket: this.config.awsConfig.bucketName,
                acl: 'public-read',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                key: (req: Request, file, cb) => {
                    const name =
                        (filename ? `${filename}_` : '') +
                        randomUUID().replace(/-/g, '')
                    const ext =
                        path.extname(file.originalname)?.toLowerCase() || ''
                    cb(null, dir + '/' + name + ext)
                },
            }),
            limits: {
                fileSize:
                    fileType === FileType.image
                        ? MAX_IMAGE_SIZE
                        : MAX_VIDEO_SIZE,
            },
        })
    }

    private fileFilter(
        fileType: FileType,
        req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
    ) {
        const supportTypes =
            fileType === FileType.image
                ? SUPPORTED_IMAGE_TYPES
                : SUPORTED_VIDEO_TYPES

        if (supportTypes.has(path.extname(file.originalname)?.toLowerCase())) {
            cb(null, true)
            return
        }
        cb(Errors.InvalidFileType)
    }
}
