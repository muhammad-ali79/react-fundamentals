import { createRoot } from 'react-dom/client'

function App() {
	return (
		<form action="api/onboarding">
			<div>
				<label htmlFor="usernameInput">Username:</label>
				<input id="usernameInput" name="username" />
			</div>
			{/* 🐨 add appropriate inputs for:
				- password
				- age (accepting numbers from 0 to 200)
				- photo (restricts the input to only accept image files)
				- color
				- startDate
			 */}

			<div>
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="Password" />
			</div>

			<div>
				<label htmlFor="age">Age</label>
				<input type="range" min={0} max={20} id="age" name="age" />
			</div>

			<div>
				<label htmlFor="photo">Photo</label>
				<input
					type="file"
					id="photo"
					accept="image/png,image/jpeg"
					name="file"
				/>
			</div>

			<div>
				<label htmlFor="color">Select Color</label>
				<input type="color" id="color" name="color" />
			</div>

			<div>
				<label htmlFor="date">Select Start Date</label>
				<input type="date" id="date" name="date" />
			</div>

			<button type="submit">Submit</button>
		</form>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
createRoot(rootEl).render(<App />)
