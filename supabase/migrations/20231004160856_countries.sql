 -- Create the table
 create table countries (
   id serial primary key,
   name text not null
 );

 -- Insert some sample data into the table
 insert into countries (name) values ('United States');
 insert into countries (name) values ('Canada');
 insert into countries (name) values ('Mexico');