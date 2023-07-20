# Import necessary libraries
import praw
from dotenv import dotenv_values, load_dotenv
import os
import pandas as pd

# Load environment variables from .env file
env = dotenv_values(".env")

# Authenticate with Reddit using PRAW
reddit = praw.Reddit(
    client_id=env["CLIENT_ID"],
    client_secret=env["CLIENT_SECRET"],
    user_agent=env["USER_AGENT"],
    redirect_uri=env["REDIRECT_URI"],
    refresh_token=env["REFRESH_TOKEN"],
)

# Create a subreddit instance
subreddit_name = "conspiracy"
subreddit = reddit.subreddit(subreddit_name)

# Print subreddit name
print(subreddit.display_name)

# Check if the CSV file already exists
csv_file_name = "reddit_posts_with_comments.csv"
if os.path.exists(csv_file_name):
    print("CSV file already exists. Appending new data and avoiding duplicates.")
    df = pd.read_csv(csv_file_name)  # Read existing CSV into a DataFrame
else:
    print("CSV file does not exist. It will be created after fetching new data.")
    df = pd.DataFrame(columns=["Title", "Id", "Upvotes", "Comments"])

# Lists to store submission information
titles = []
scores = []
ids = []
comments = []

# Loop through the newest 21 submissions in the subreddit
for submission in subreddit.new(limit=21):
    # Check if the submission ID already exists in the DataFrame to avoid duplication
    if submission.id not in df["Id"].values:
        titles.append(submission.title)  # Add submission title to the titles list
        scores.append(submission.score)  # Add upvotes to the scores list
        ids.append(submission.id)  # Add submission ID to the ids list

        # Fetch comments for the current submission
        submission.comments.replace_more(limit=None)
        submission_comments = []
        for comment in submission.comments.list():
            submission_comments.append(comment.body)
        comments.append(submission_comments)

# Create a DataFrame with the new data
new_data = pd.DataFrame(
    {"Title": titles, "Id": ids, "Upvotes": scores, "Comments": comments}
)

# Append the new data to the existing DataFrame
df = df.append(new_data, ignore_index=True)

# Drop duplicates based on the 'Id' column (submission IDs)
df.drop_duplicates(subset="Id", keep="last", inplace=True)

# Save the updated DataFrame to the CSV file
df.to_csv(csv_file_name, index=False)

# Print the shape of the DataFrame and display the first 10 rows
print(df.shape)
print(df.head(10))

print(
    f"CSV file '{csv_file_name}' has been generated/updated with the new Reddit posts and comments while avoiding duplicates."
)
