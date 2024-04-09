import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	return {
		articles: await prisma.article.findMany()
	};
};

export const actions: Actions = {
	deleteArticle: async ({ url }) => {
		const id = url.searchParams.get("id");

		if (!id) {
			return fail(400, { message: "Invalid request" });
		}

		try {
			await prisma.article.delete({
				where: {
					id: Number(id)
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: "Something went wrong deleting your article" });
		}
	}
};
