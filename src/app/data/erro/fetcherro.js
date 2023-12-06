export async function getErros() {
    const res = await fetch(`http://localhost:8080/erro-service/erro/all`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}

export async function addErro(data) {
    const res = await fetch('http://localhost:8080/erro-service/erro/save', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        accept: 'application/json',
        body: JSON.stringify(data),
    });
    return await res.json();
}

export async function getErro(cdErro) {
    const res = await fetch(`http://localhost:8080/erro-service/erro/find/` + cdErro, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}