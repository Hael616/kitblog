<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	$: ({ articles } = data);
</script>

<div class="grid">
	<div class="">
		<h2>Articles:</h2>
		<div class="grid grid-cols-4 gap-4">
			{#each articles as article}
				<article class="">
					<header class="pico-color-pink-200">{article.title}</header>
					<p class="mb-6">
						{article.content}
					</p>
					<form action="?/deleteArticle&id={article.id}" method="post">
						<button type="submit" class="outline secondary">Delete Article</button>
					</form>
					<a href="/{article.id}" role="button" class="outline contrast" style="width: 100%;"
						>Edit Article</a
					>
				</article>
			{/each}
		</div>
	</div>
</div>
