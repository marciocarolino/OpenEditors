import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";

import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);

  function handleinputChange(e) {
    setNewRepo(e.target.value);
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const response = await api.get(`repos/${newRepo}`);

  //   console.log(response.data.full_name);
  // }

  const handleSubmit = useCallback((e) => {
      e.preventDefault();

      async function submit() {
        const response = await api.get(`repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        };
        
        setRepositorios([...repositorios, data]);
        setNewRepo("");
      }
      submit()
    },
    [newRepo, repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleinputChange}
        />
        <SubmitButton>
          <FaPlus color="#FFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}