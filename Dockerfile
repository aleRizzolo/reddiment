FROM jupyter/base-notebook

WORKDIR /app

RUN pip install praw \
    pip install nltk \
    pip install torch \
    pip install numpy \
    pip install emoji \
    pip install pandas \
    pip install langdetect \
    pip install transformers \
    pip install python-dotenv \
    pip install beautifulsoup4

COPY . .

EXPOSE 8888

CMD ["jupyter", "notebook"]