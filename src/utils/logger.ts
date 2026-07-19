import winston from "winston"
import "winston-daily-rotate-file"

const logDirectory = "logs";

const transport = new winston.transports.DailyRotateFile({
  dirname: logDirectory,
  filename: "gateway-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "3d",
});

const logger = winston.createLogger({
  level: "info",
 format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),           
    winston.format.splat(),
    winston.format.json()                           
  ),
  
  transports: [transport, new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
  })],
});

export default logger