'use client'
import {React, useState, useEffect} from "react";
import {Input, Select, SelectItem, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Textarea, Button, Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import '@/app/erro/[id]/viewerro.css';
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
  const [solucoes, setSolucoes] = useState([]);
  
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
      setSolucoes(erro.solucoes);
      console.log(erro);
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
                  <BreadcrumbItem>Visualizar</BreadcrumbItem>
                </Breadcrumbs>
              </div>
            </NavbarItem>
            
          </NavbarContent>
        </Navbar>
        <br/>
        <div className="viewErroContainer">
            <br/>
            <h2>{sistema.sgSistema} - {nmErro}</h2>
            <br/>
            <label>Descrição</label>
            <p>{deErro}</p>
            <br/>
            <label>Soluções</label>
            {solucoes.forEach((solucao) => {
              <p>{solucao.deSolucao}</p>
            }             
            )}
            
            <br/>
        </div>
      </div>
    )
}