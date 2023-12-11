'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Link, Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import '@/app/components/errortable.css'
import { FaEye, FaEdit } from "react-icons/fa";


const columns = [
  {
    key: "nmErro",
    label: "Erro",
  },
  {
    key: "deErro",
    label: "Descrição",
  },
  {
    key: "sistema",
    label: "Sistema",
  },
  {
    key: "autor",
    label: "Autor",
  },
  {
    key: "actions",
    label: "Ações",
  },
];

export default function ErrorTable(erros) {

  const errorsList = erros.rows.map(item => {
    const erroObjeto = {
        cdErro: item.cdErro || undefined,
        nmErro: item.nmErro || undefined,
        deErro: item.deErro || undefined,
        dtCriacao: item.dtCriacao || undefined,
        autor: item.autor || undefined,
        sistema: item.sistema?.sgSistema  || '',
        solucoes: item.solucoes || undefined,
    };
    return erroObjeto;
  });

  const handleClick = (e, path) => {
    e?.preventDefault();
    if (path === "/erro/novo") {
      window.location.href = path;
    }
  };

  function editErro(cdErro) {
    window.location.href = '/erro/editar/' + cdErro;
  }

  function viewErro(cdErro) {
    window.location.href = '/erro/' + cdErro;
  }

  return (


    <div className="errorContainer">
      <div>
      <Navbar position="static" isBordered isBlurred shouldHideOnScroll> 
          <NavbarContent className="hidden sm:flex gap-4" justify="start">
            <NavbarItem>
              <div className="cadNavbar">
                <Breadcrumbs id="breadcrumb">
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            </NavbarItem>
            
          </NavbarContent>
        </Navbar>
      </div>

      <Table aria-label="Tabela de erros" shadow="lg" radius="lg" className="errorTable" isStriped>
        <TableHeader columns={columns} >
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody 
          items={errorsList}>
          {(item) => (
            <TableRow key={item.cdErro}>
              {(columnKey) => 
                <TableCell>
                  {
                    columnKey === "actions" ? 
                      <div>
                        <Link onClick={(e) => {viewErro(item.cdErro)}} ><FaEye /></Link> &nbsp; &nbsp;  
                        <Link onClick={(e) => {editErro(item.cdErro)}} ><FaEdit /></Link> 
                      </div>
                      : 
                      getKeyValue(item, columnKey)
                  }
                </TableCell>           
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Button color="success" variant="shadow" className="btnNovoErro" onClick={(e) => handleClick(e, '/erro/novo')}>Novo</Button> 
    </div>
  );
}
