@echo off

docker run -d --rm --name reddiment -p 8888:8888 -v "%cd%"/.env:/app/.env alessiorizz/reddiment