<script>
  import { onMount } from 'svelte';

  import { MongoClient } from 'mongodb';

  export let comments = [];

  onMount(async () => {
    const client = new MongoClient(process.env.MONGO_URI);

    try {
      await client.connect();
      const db = client.db('Reddiment');
      const collection = db.collection('dataset');
      const result = await collection.find().toArray();
      comments = result;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  });
</script>

<ul>
  {#each comments as comment}
    <li key={comment._id}>
      <p>{comment.comment}</p>
      <p>
        Acceptable: {comment.probabilities_acceptable}
        Hate: {comment.probabilities_hate}
        Offensive: {comment.probabilities_offensive}
        Violent: {comment.probabilities_violent}
      </p>
    </li>
  {/each}
</ul>