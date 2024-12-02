import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent } = dtl

import './index.tsx'

const form = await dtl.waitFor(() => {
	const form = document.querySelector('form')
	expect(form).toBeInTheDocument()
	return form
})

await testStep('Form has correct action', async () => {
	expect(form).toHaveAttribute(
		'action',
		expect.stringMatching(/javascript:throw/),
	)
})

await testStep('Form has correct method (none)', async () => {
	expect(form).not.toHaveAttribute('method', 'POST')
})

await testStep('Form has correct encType (none)', async () => {
	expect(form).not.toHaveAttribute('encType', 'multipart/form-data')
})

// Mock console.log
const originalLog = console.log
const mockLogs: Array<any> = []
console.log = (...args) => {
	// Forward all args to the originalLog
	originalLog(...args)

	// Check if the log is coming from the action function
	const stack = new Error().stack
	if (stack?.includes('action')) {
		mockLogs.push(args)
	}
}

try {
	await testStep('Form action logs correct data', async () => {
		// Fill out the form
		const accountTypeSelect = await screen.findByLabelText(/account type/i)
		const usernameInput = await screen.findByLabelText(/username/i)
		const passwordInput = await screen.findByLabelText(/password/i)
		const ageInput = await screen.findByLabelText(/age/i)
		const colorInput = await screen.findByLabelText(/favorite color/i)
		const publicRadio = await screen.findByLabelText(/public/i)
		const startDateInput = await screen.findByLabelText(/start date/i)
		const submitButton = await screen.findByRole('button', { name: /submit/i })

		fireEvent.change(accountTypeSelect, { target: { value: 'teacher' } })
		fireEvent.change(usernameInput, { target: { value: 'testuser' } })
		fireEvent.change(passwordInput, { target: { value: 'password123' } })
		fireEvent.change(ageInput, { target: { value: '25' } })
		fireEvent.change(colorInput, { target: { value: '#ff0000' } })
		fireEvent.click(publicRadio)
		// this now defaults to true
		// fireEvent.click(waiverSignedInput)
		fireEvent.change(startDateInput, { target: { value: '2023-01-01' } })

		// Submit the form
		fireEvent.click(submitButton)

		// Assert that console.log was called with the correct form data
		expect(mockLogs[0][0]).toEqual(
			expect.objectContaining({
				orgId: '123',
				accountType: 'teacher',
				username: 'testuser',
				password: 'password123',
				age: '25',
				color: '#ff0000',
				visibility: 'public',
				waiver: 'on',
				startDate: '2023-01-01',
			}),
		)
	})
} finally {
	// Restore original console.log after tests
	console.log = originalLog
}