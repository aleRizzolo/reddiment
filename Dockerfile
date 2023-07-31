FROM jupyter/base-notebook

WORKDIR /app

RUN pip install praw \
    pip install python-dotenv \
    pip install pandas \
    pip install nltk \
    pip install numpy \
    pip install beautifulsoup4

COPY . .

EXPOSE 8888

CMD ["jupyter", "notebook"]