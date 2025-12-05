import "./styles.css";

function CuadroInformativo({ titulo, valor, estadistica, sugerencia }) {
    return (
        <div className="cuadro-info">
            <div className="fila-superior">
                <span className="titulo">{titulo}</span>
                <span className="criticos">{sugerencia}</span>
            </div>
            <p className="valor">{valor}</p>
            <p className="estadistica">{estadistica}</p>
        </div>
    );
}

export default CuadroInformativo;
