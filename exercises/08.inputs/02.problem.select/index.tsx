import { createRoot } from 'react-dom/client'

function App() {
	function logFormData(formData: FormData) {
		console.log(Object.fromEntries(formData))
	}
	return (
		<form action={logFormData}>
			{/* 🐨 add a label "Account Type" */}
			<label htmlFor="accountTag">AccountTag</label>
			{/* 🐨 add a select with the following options:
				- admin
				- teacher
				- parent
				- student
			 */}
			<select id="accountTag" name="accountType">
				<option value="admin">admin</option>
				<option value="teacher">teacher</option>
				<option value="parent">parent</option>
				<option value="student">student</option>
			</select>
			{/* 💯 make the first option be "--Please select an option--" with a value of an empty string */}
			<div>
				<label htmlFor="usernameInput">Username:</label>
				<input id="usernameInput" name="username" />
			</div>
			<div>
				<label htmlFor="passwordInput">Password:</label>
				<input id="passwordInput" name="password" type="password" />
			</div>
			<div>
				<label htmlFor="ageInput">Age:</label>
				<input id="ageInput" name="age" type="number" min="0" max="200" />
			</div>
			<div>
				<label htmlFor="photoInput">Photo:</label>
				<input id="photoInput" name="photo" type="file" accept="image/*" />
			</div>
			<div>
				<label htmlFor="colorInput">Favorite Color:</label>
				<input id="colorInput" name="color" type="color" />
			</div>
			<div>
				<label>
					<input name="waiver" type="checkbox" />
					Waiver Signed
				</label>
			</div>
			<div>
				<label htmlFor="startDateInput">Start Date:</label>
				<input id="startDateInput" name="startDate" type="date" />
			</div>
			<button type="submit">Submit</button>
		</form>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
createRoot(rootEl).render(<App />)
