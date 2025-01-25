import './footer.css'
export function Footer() {
	return (
		<footer className="footer">
			<p>Desarrollado por <strong>lightbblue</strong> &copy; {new Date().getFullYear()}</p>
			{/* <p>
				Código disponible en <a href="https://github.com/lightbblue" target="_blank" rel="noopener noreferrer">GitHub</a>.
			</p> */}
		</footer>
	)
}