public class Cliente
{
    public int cont;
    public int id_client;
    public string nome;
    public string cognome;
    public string cf;
    public int stipendio;

    public Cliente(int id_client, string nome,string cognome,string cf,int stipendio)
    {
        this.id_client = cont++;
        this.nome = nome;
        this.cognome = cognome;
        this.cf = cf;
        this.stipendio = stipendio;
    }

}