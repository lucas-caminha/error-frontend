export async function getSistemas() {
    const res = await fetch(`http://localhost:8080/erro-service/sistema/all`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}