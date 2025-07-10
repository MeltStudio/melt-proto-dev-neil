import { FormData } from "@/src/utils/types";

export async function createTask (formData: FormData) {
	const res = await fetch('/api/contact', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formData),
	})
    console.log(formData)
	if (!res.ok) throw new Error('Failed to create task')
	return res.json()
}