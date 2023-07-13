import praw
import json
import requests
import dotenv


env = dotenv.dotenv_values(".env")


# Authenticate with Reddit
reddit = praw.Reddit(
    client_id=env["CLIENT_ID"],
    client_secret=env["CLIENT_SECRET"],
    user_agent=env["USER_AGENT"],
    redirect_uri=env["REDIRECT_URI"],
    refresh_token=env["REFRESH_TOKEN"],
)

# subr = "pythonsandlot"  # Choose your subreddit

# subreddit = reddit.subreddit(subr)  # Initialize the subreddit to a variable

# title = "Just Made My first Post on Reddit Using Python."

# selftext = """
# I am learning how to use the Reddit API with Python using the PRAW wrapper.
# By following the tutorial on https://www.jcchouinard.com/post-on-reddit-api-with-python-praw/
# This post was uploaded from my Python Script
# """
# subreddit.submit(title, selftext=selftext)
subreddit = "todayilearned"
count = 1
timeframe = "day"  # hour, day, week, month, year, all
listing = "random"  # controversial, best, hot, new, random, rising, top


def get_reddit(subreddit, count):
    try:
        base_url = f"https://www.reddit.com/r/{subreddit}/{listing}.json?count={count}&t={timeframe}"
        request = requests.get(base_url, headers={"User-agent": "yourbot"})
    except:
        print("An Error Occured")
    return request.json()


top_post = get_reddit(subreddit, count)

if listing != "random":
    title = top_post["data"]["children"][0]["data"]["title"]
    url = top_post["data"]["children"][0]["data"]["url"]
else:
    title = top_post[0]["data"]["children"][0]["data"]["title"]
    url = top_post[0]["data"]["children"][0]["data"]["url"]
# Specify the subreddit and post ID you want to retrieve
subreddit_name = "AskReddit"
post_id = "abc123"

# Get the post and its comments
subreddit = reddit.subreddit(subreddit_name)
submission = subreddit.submission(id=post_id)
submission.comments.replace_more(limit=None)

# Print the post title and body
print(f"Post Title: {submission.title}")
print(f"Post Body: {submission.selftext}")

# Print the comments
for comment in submission.comments.list():
    print("-" * 50)
    print(f"Comment: {comment.body}")

print(f"{title}\n{url}")
