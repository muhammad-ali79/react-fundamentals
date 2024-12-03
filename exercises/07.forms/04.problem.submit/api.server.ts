import { respondWithDataTable } from '#shared/api-utils'

// 🐨 change this from `loader` to `action`
export async function action({ request }: { request: Request }) {
	// 🐨 change data to be `await request.formData()`
	const data = await request.formData()
	return respondWithDataTable(data)
}
