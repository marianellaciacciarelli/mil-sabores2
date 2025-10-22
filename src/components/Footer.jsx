export default function Footer() {
  return (
    <footer className="text-center p-4 bg-rosa-suave">
      Síguenos en{' '}
      <a href="#" className="text-choco">Facebook</a> |{' '}
      <a href="#" className="text-choco">Instagram</a>
      <p>❤️ ¡Celebra la dulzura de la vida con Pastelería 1000 Sabores! ❤️</p>
      © {new Date().getFullYear()} Pastelería 1000 Sabores — Todos los derechos reservados
    </footer>
  );
}
