'use client'
import {React, useState, useEffect} from "react";
import {Input, Select, SelectItem, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Textarea, Button, Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import '@/app/erro/novo/caderro.css';
import { SlArrowLeftCircle } from "react-icons/sl";
import { getSistemas } from "@/app/data/sistema/fetchsistema";
import { addErro } from "@/app/data/erro/fetcherro";

function Erro(nmErro, deErro, autor, cdSistema) {
  this.nmErro = nmErro,
  this.deErro = deErro,
  this.autor = autor, 
  this.cdSistema = cdSistema
}


export default function Page() {

  const [sistemas, setSistemas] = useState([]);

  const [nmErro, setNmErro] = useState('');
  const [deErro, setDeErro] = useState('');
  const [autor, setAutor] = useState('');
  const [cdSistema, setCdSistema] = useState();
  
  useEffect(() => {
    const sys = getSistemas();
    sys.then(value => {
      setSistemas(value);
    });
  }, []);

  async function saveErro(event) {
    event.preventDefault();
    const erro = new Erro(nmErro, deErro, autor, cdSistema.currentKey);
    var bodyRequest = JSON.parse(JSON.stringify(erro));
    const salved = addErro(bodyRequest);
    salved.then(value => {
      window.location.href = '/erro/editar/'+ value.cdErro;
    })  
  }

    return (
      <div>
        <Navbar position="static" isBordered isBlurred shouldHideOnScroll> 
          <NavbarContent className="hidden sm:flex gap-4" justify="start">
            <NavbarItem>
              <div className="cadNavbar">
                <Link color="foreground" href="/" size="lg">
                  <SlArrowLeftCircle />
                </Link>
                <Breadcrumbs id="breadcrumb">
                  <BreadcrumbItem href="/">Home</BreadcrumbItem>
                  <BreadcrumbItem>Erro</BreadcrumbItem>
                  <BreadcrumbItem>Novo</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            </NavbarItem>
            
          </NavbarContent>
        </Navbar>
        <br/>
        <div className="cadErroContainer">
            <Input isRequired type="text" label="Nome" name="nmErro" className="max-w-xs" onChange={(e) => setNmErro(e.target.value)} />
            <br/>
            <Textarea isRequired label="Descrição" name="deErro" className="max-w-xs" disableAutosize onChange={(e) => setDeErro(e.target.value)}
              classNames={{
                base: "max-w-xs",
                input: "resize-y min-h-[40px]",
            }}/>
            <br/>
            <Input type="text" label="Autor" name="autor" className="max-w-xs" onChange={(e) => setAutor(e.target.value)}/>
            <br/>
            <Select
              items={sistemas}
              isRequired
              label="Sistema"
              name="sistemas"
              className="max-w-xs"
              selectedKeys={cdSistema}
              onSelectionChange={setCdSistema}>
              {(sistema) => <SelectItem key={sistema.cdSistema} value={sistema.cdSistema}>{sistema.sgSistema}</SelectItem>}
            </Select>
            <br/>
            <Button color="success" type="button" onClick={saveErro}>Salvar</Button> 
        </div>
      </div>
    )
}