SELECT *
FROM users;

SELECT *
FROM categoria;

SELECT *
FROM productos;

update productos set disponible = 1 where id in(42,41,43,1);
commit;

insert into categoria (nombre, descripcion, color, activa) values ('Fresa', 'Productos de fresa', '#aa0c0cff', 1);
commit;

UPDATE users
SET role = 'ADMIN'
WHERE email = 'admi5555@gmail.com';
commit;