const url = `https://6827c5f36b7628c5291152da.mockapi.io/f1`;
const myHeader = new Headers({
  'Content-Type': 'application/json'
});

const getEquipos = async () => {
  const response = await fetch(`${url}/equipos`);
  const data = await response.json();
  return data;
};

const getPilotos = async () => {
    const response = await fetch(`${url}/pilotos`);
    const data = await response.json();
    return data;
  };

const getEscuderias = async () => {
    const response = await fetch(`${url}/escuderias`);
    const data = await response.json();
    return data;
};  
