import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate();

    const searchHandler = (e) =>{
        e.preventDefault();

        if(keyword.trim()){ //si la medida de la palabra cambia
            navigate(`/search/${keyword}`) // vaya a esta direccion
        }
        else{
            navigate("/") //leve a la pagina principal
        }
    }
    console.log(keyword)

    return (
    <form onSubmit={searchHandler}> {/* searchHandler es un metodo de busqueda */}
    <div className="input-group">
    <input
        type="text"
        id="search_field"
        class="form-control"
        placeholder='Que producto busca?...'
        onChange={(e) => setKeyword(e.target.value)} // buca por un palabra
        />
        
    <div class="input-group-append">
        <button id="search_btn" class="btn">
            <i class="fa fa-search" aria-hidden="true"></i>
        </button>
    </div>
</div>
</form >
  );
};

export default Search