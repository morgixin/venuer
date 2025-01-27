import { ReactNode } from "react";

interface Props {
    id?: number;
    imagem: string;
    titulo: string;
    descricao: string;
    preco: string;
    categoria: string;
    footer: ReactNode;
}

const Card = ({imagem, titulo, descricao, preco, categoria, footer }: Props) => {
    return (
      <>
        <div className="card border-0 w-120 bg-light shadow-sm p-3 mb-5 rounded">
          <img src={imagem} className="card-img-top" height="200px" style={{objectFit: "cover"}} alt={titulo} />
          <div className="card-body">
            <p className="card-text mb-0"><small className="text-muted">{categoria}</small></p>
            <h5 className="card-title">{titulo}</h5>
            <p className="card-text">{descricao}</p>
            <p className="card-text fw-bold" style={{color: "rgb(220, 53, 69)"}}>R$ {preco}</p>
          </div>
          <div className="card-footer border-0 p-0 mb-3">{footer}</div>
        </div>
      </>
    );
  };
  export default Card;
  