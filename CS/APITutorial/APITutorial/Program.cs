using APITutorial.Models;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Drawing;
using System.Text;
using System.Data;

//Separare connessione,route ecc
internal class Program
{

    public static void createTable(Npgsql.NpgsqlConnection con)
    {
        
        using var cmd = new NpgsqlCommand();
        cmd.Connection = con;


        /*Create and drop table
        cmd.CommandText = "DROP TABLE IF EXISTS Students";
        cmd.ExecuteNonQuery();
        
        cmd.CommandText = @"CREATE TABLE Students(id SERIAL PRIMARY KEY, firstname VARCHAR(255),
        lastname VARCHAR(255), location VARCHAR(255), date VARCHAR(255))";
        cmd.ExecuteNonQuery();
        */
        //Insert into table
        cmd.CommandText = "INSERT INTO Students(firstname,lastname,location,date) VALUES ('Simone','Bisignano','Casale Monferrato','1998-07-29')";
        cmd.ExecuteNonQuery();
        cmd.CommandText = "INSERT INTO Students(firstname,lastname,location,date) VALUES ('Calippo','Sudicio','Albenga','2001-05-10')";
        cmd.ExecuteNonQuery();
        cmd.CommandText = "INSERT INTO Students(firstname,lastname,location,date) VALUES ('Alessandro','Pittarelli','Loano','1785-02-10')";
        cmd.ExecuteNonQuery();
        cmd.CommandText = "INSERT INTO Students(firstname,lastname,location,date) VALUES ('Gennaro','Zibibbo','Torino','1998-07-29')";
        cmd.ExecuteNonQuery();


    }

    public static List<Friend> getUsers(Npgsql.NpgsqlConnection con)
    {
        APITutorial.Controllers.FriendController f = new APITutorial.Controllers.FriendController();
        string sql = "SELECT * FROM Students";
        using var cmd = new NpgsqlCommand(sql, con);

        Friend fr = new Friend();
        using NpgsqlDataReader rdr = cmd.ExecuteReader();
        while(rdr.Read())
        {
            fr = new Friend(rdr.GetInt32(0), rdr.GetString(1), rdr.GetString(2), rdr.GetString(3), rdr.GetString(4));
            f.friends.Add(fr);
        }
        f.getAllUsers(f.friends);
        return f.friends;
    }

    public static void createUser(Friend c,Npgsql.NpgsqlConnection con) {
        APITutorial.Controllers.FriendController f = new APITutorial.Controllers.FriendController();

        string sql = "INSERT INTO Students(firstname,lastname,location,date) VALUES (@firstname,@lastname,@location,@date)";
        using var cmd = new NpgsqlCommand(sql,con);

        cmd.Parameters.AddWithValue("firstname", c.firstname);
        cmd.Parameters.AddWithValue("lastname", c.lastname);
        cmd.Parameters.AddWithValue("location", c.location);
        cmd.Parameters.AddWithValue("date", c.date);
        cmd.Prepare();

        cmd.ExecuteNonQuery();

        f.friends.Add(c);
        
        return;
    }

    public static void deleteUser(Friend q,Npgsql.NpgsqlConnection con )
    {
        string sql = "DELETE FROM Students WHERE firstname=@firstname";
        using var cmd = new NpgsqlCommand(sql, con);

        string inputFirstname = q.firstname;

        cmd.Parameters.AddWithValue("firstname", inputFirstname);
        cmd.ExecuteNonQuery();
        return;
    }



    private static void Main(string[] args)
    {

        var cs = "Host=localhost;Username=postgres;Password=Genesis24!;Database=personalDB";
        using var con = new NpgsqlConnection(cs);
        con.Open();

        List<Friend> list = new List<Friend>();

        if(con.State == ConnectionState.Open)
        {
            Console.WriteLine("Connection successfull.");
            createTable(con);
            list = getUsers(con);
        }
        
        APITutorial.Controllers.FriendController f = new APITutorial.Controllers.FriendController();

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();


        var app = builder.Build();

        app.MapGet("/", () =>
        {
            
        });

        app.MapGet("/api/utente/{id}", (int id) => f.GetID(id));
        app.MapGet("/api/user/{firstname}", (string firstname) => f.GetLastname(firstname));
        app.MapPost("api/friend", ([FromBody] Friend g) => f.postFriend(g));
        app.MapGet("api/alluser", () => f.getAllUsers(list));
        app.MapPost("api/create", ([FromBody] Friend c) => {
            createUser(c,con);
        });
        app.MapDelete("api/delete", ([FromBody] Friend q) =>
        {
            deleteUser(q,con);
        });



        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}