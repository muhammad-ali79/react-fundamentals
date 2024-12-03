import { createRoot } from 'react-dom/client'

export function Box({
	size,
	...otherProps
}: {
	size?: 'small' | 'medium' | 'large'
} & React.ComponentProps<'div'>) {
	const boxSize = size ? `box--${size}` : ''

	return (
		<div
			// 💯 for something extra, handle the case where no className is given (remove extra spaces).
			className={`box ${boxSize}`}
			style={{ fontStyle: 'italic', ...otherProps.style }}
			{...otherProps}
		/>
	)
}

function App() {
	return (
		<div>
			{/* 🐨 update all these boxes to use the size prop */}
			<Box size="small" style={{ backgroundColor: 'lightblue' }}>
				small lightblue box
			</Box>
			<Box size="medium" style={{ backgroundColor: 'pink' }}>
				medium pink box
			</Box>
			<Box size="large" style={{ backgroundColor: 'orange' }}>
				large orange box
			</Box>
			<Box>sizeless colorless box</Box>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
createRoot(rootEl).render(<App />)
