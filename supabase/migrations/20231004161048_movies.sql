 -- Create the table
 create table movies (
   id serial primary key,
   name text not null
 );

 -- Insert some sample data into the table
 insert into movies (name) values ('Pokiri');
 insert into movies (name) values ('Johnny');
 insert into movies (name) values ('Baba');