import "./styles.css"

function CuadroInformativo({titulo, valor}) {
    return (
        <div className="recuadro-general">
            <p>{titulo}</p>
            <p>{valor}</p>
        </div>
    );
}

export default CuadroInformativo;