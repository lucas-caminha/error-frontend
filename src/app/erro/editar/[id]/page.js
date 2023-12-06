'use client'
import {React, useState, useEffect} from "react";
import {Input, Select, SelectItem, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Textarea, Button, Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import '@/app/erro/novo/caderro.css';
import { SlArrowLeftCircle } from "react-icons/sl";
import { getSistemas } from "@/app/data/sistema/fetchsistema";
import { addErro, getErro } from "@/app/data/erro/fetcherro";
import { useRouter } from 'next/router'

function Erro(cdErro, nmErro, deErro, autor, cdSistema) {
  this.cdErro = cdErro;
  this.nmErro = nmErro,
  this.deErro = deErro,
  this.autor = autor, 
  this.cdSistema = cdSistema
}

export default function Page({ params }) {
  const [sistemas, setSistemas] = useState([]);

  const [cdErro, setCdErro] = useState(params.id);
  const [nmErro, setNmErro] = useState('');
  const [deErro, setDeErro] = useState('');
  const [autor, setAutor] = useState('');
  const [cdSistema, setCdSistema] = useState();

  const [erro, setErro] = useState({});
  const [sistema, setSistema] = useState({});
  
  useEffect(() => {
    const sys = getSistemas();
    sys.then(value => {
      setSistemas(value);
    });
  }, []);

  useEffect(() => {
    if(cdErro != null) {
      const erro = getErro(cdErro);
      erro.then(value => {
        setErro(value);
      });
    };
  }, [cdErro])

  useEffect(() => {
    if(erro.cdErro != null) {
      setCdErro(erro.cdErro);
      setNmErro(erro.nmErro);
      setDeErro(erro.deErro);
      setAutor(erro.autor);
      if(erro.sistema?.cdSistema != null && erro.sistema?.cdSistema != undefined) {
        setCdSistema(erro.sistema.cdSistema);
        sistemas.forEach(sys => {
          if(sys.cdSistema == cdSistema) {
            setSistema(sys);
          }
        })
      }
    };
  }, [erro])

  async function updateErro(event) {

    event.preventDefault();

    const erro = new Erro(cdErro, nmErro, deErro, autor, cdSistema.currentKey);
    var bodyRequest = JSON.parse(JSON.stringify(erro));
    const x = addErro(bodyRequest);
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
                  <BreadcrumbItem>Editar</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            </NavbarItem>
            
          </NavbarContent>
        </Navbar>
        <br/>
        <div className="cadErroContainer">
            <Input isRequired isDisabled type="text" label="Código" name="cdErro" className="max-w-xs" value={cdErro} onChange={(e) => setCdErro(e.target.value)} />
            <br/>
            <Input isRequired type="text" label="Nome" name="nmErro" className="max-w-xs" value={nmErro} onChange={(e) => setNmErro(e.target.value)} />
            <br/>
            <Textarea isRequired label="Descrição" name="deErro" className="max-w-xs" value={deErro} disableAutosize onChange={(e) => setDeErro(e.target.value)}
              classNames={{
                base: "max-w-xs",
                input: "resize-y min-h-[40px]",
            }}/>
            <br/>
            <Input isDisabled type="text" label="Autor" name="autor" className="max-w-xs" value={autor} onChange={(e) => setAutor(e.target.value)}/>
            <br/>
            <Input isDisabled type="text" label="Sistema" name="autor" className="max-w-xs" value={sistema.sgSistema} onChange={(e) => setCdSistema(e.target.value)}/>
            <br/>
            <Button color="success" type="button" onClick={updateErro}>Salvar</Button> 
        </div>
      </div>
    )
}