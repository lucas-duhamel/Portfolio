import {useEffect,useState} from "react";
import {NavLink,Link,Routes,Route,useParams} from "react-router";
import {apiFetch} from "./api.js";

function useApi(path) {
  const [state,setState] = useState({data:null,loading:true,error:""});
  useEffect(() => {
    const controller = new AbortController();
    setState({data:null,loading:true,error:""});
    apiFetch(path,{signal:controller.signal}).then(data => setState({data,loading:false,error:""}))
      .catch(error => {if(error.name !== "AbortError") setState({data:null,loading:false,error:error.message});});
    return () => controller.abort();
  },[path]);
  return state;
}
function Etat({state,children}) {
  if(state.loading) return <p className="state" role="status">Chargement…</p>;
  if(state.error) return <p className="state error" role="alert">Impossible de charger les données : {state.error}. Vérifie que l'API est démarrée.</p>;
  return children;
}
function Header({theme,toggle}) {
  return <header><nav className="nav wrap" aria-label="Navigation principale">
    <Link to="/" className="brand"><b>S<span>.</span></b> PORTFOLIO <small>/ SGB</small></Link>
    <div className="navlinks">
      <NavLink to="/" end>Accueil</NavLink><NavLink to="/projets">Projets</NavLink>
      <NavLink to="/competences">Compétences</NavLink><NavLink to="/a-propos">À propos</NavLink>
    </div>
    <button className="theme" onClick={toggle} aria-label="Changer le thème">{theme === "dark" ? "☼" : "☾"}</button>
  </nav></header>;
}
function Footer() {
  return <footer><div className="wrap foot"><span>© {new Date().getFullYear()} Portfolio</span><span>React · Node.js · Express</span><a href="#top">Retour en haut ↑</a></div></footer>;
}
function ProjectCard({p}) {
  return <article className="card">{p.image && <img className="project-image" src={p.image} alt={p.imageAlt || ("Illustration du projet " + p.titre)} loading="lazy" />}<div className="cardmeta"><span>{p.categorie || "Projet"}</span><span>{p.annee || ""}</span></div>
    <h3>{p.titre}</h3><p>{p.resume}</p><div className="tags">{(p.tags || []).map(t=><span key={t}>{t}</span>)}</div>
    <Link className="more" to={"/projets/" + p.slug}>Découvrir le projet ↗</Link></article>;
}
function Timeline({items=[]}) {
  if(!items.length) return <p className="empty">Le parcours sera renseigné ici prochainement.</p>;
  return <ol className="timeline">{items.map((item,i)=><li key={item.id || i}><small>{item.periode}</small><div><h3>{item.intitule}</h3><p>{item.organisme}</p>{item.description && <p>{item.description}</p>}</div></li>)}</ol>;
}
function Home() {
  const profil=useApi("/api/profil"),projets=useApi("/api/projets"),parcours=useApi("/api/parcours");
  return <><Etat state={profil}>{profil.data && <section className="hero wrap" id="top">
    <div><p className="eyebrow">● {profil.data.disponibilite}</p><h1>{profil.data.nom}</h1><h2>{profil.data.titre}</h2><p className="intro">{profil.data.accroche}</p>
    <div className="actions"><Link className="btn primary" to="/projets">Voir mes projets ↗</Link><Link className="btn" to="/a-propos">En savoir plus</Link></div></div>
    <div className="visual" aria-label="Smart and Green Building"><div className="ring"></div><strong>S<span>GB</span></strong><small>SMART · CONNECTED · SUSTAINABLE</small></div>
  </section>}</Etat>
  <section className="section wrap"><div className="heading"><div><p className="eyebrow">01 / Sélection</p><h2>Projets récents<span>.</span></h2></div><Link className="more" to="/projets">Tous les projets ↗</Link></div>
    <Etat state={projets}>{projets.data?.length ? <div className="grid">{projets.data.slice(0,3).map(p=><ProjectCard key={p.slug} p={p}/>)}</div> : <div className="emptybox"><b>01—</b><div><h3>Les projets arrivent bientôt.</h3><p>Cette section sera complétée avec les réalisations que tu souhaites présenter.</p></div></div>}</Etat>
  </section>
  <section className="section tinted"><div className="wrap"><div className="heading"><div><p className="eyebrow">02 / Parcours</p><h2>Formation & expériences<span>.</span></h2></div></div><Etat state={parcours}><Timeline items={parcours.data || []}/></Etat></div></section></>;
}
function Projects() {
  const {data,loading,error}=useApi("/api/projets"); const [query,setQuery]=useState(""); const [tag,setTag]=useState("Tous");
  const tags=["Tous",...new Set((data||[]).flatMap(p=>p.tags||[]))];
  const filtered=(data||[]).filter(p=>(tag==="Tous"||(p.tags||[]).includes(tag)) && (p.titre+" "+p.resume+" "+(p.tags||[]).join(" ")).toLowerCase().includes(query.toLowerCase()));
  return <section className="page wrap"><div className="pagehead"><p className="eyebrow">Explorer / 01</p><h1>Projets<span>.</span></h1><p>Une sélection de réalisations, de recherches et de projets techniques.</p></div>
    <Etat state={{loading,error}}>{data?.length ? <><div className="tools"><input aria-label="Rechercher un projet" placeholder="Rechercher un projet…" value={query} onChange={e=>setQuery(e.target.value)}/><div className="filters">{tags.map(t=><button key={t} className={tag===t?"selected":""} onClick={()=>setTag(t)}>{t}</button>)}</div></div><p className="count">{filtered.length} projet(s)</p>{filtered.length?<div className="grid">{filtered.map(p=><ProjectCard key={p.slug} p={p}/>)}</div>:<p className="empty">Aucun projet ne correspond à cette recherche.</p>}</> : <div className="emptybox"><b>—</b><div><h3>Portfolio en construction.</h3><p>Les projets seront ajoutés après sélection et validation de leur contenu.</p></div></div>}</Etat>
  </section>;
}
function ProjectDetail() {
  const {slug}=useParams(); const state=useApi("/api/projets/"+encodeURIComponent(slug));
  return <section className="page wrap"><Link className="back" to="/projets">← Retour aux projets</Link><Etat state={state}>{state.data && <article className="detail"><p className="eyebrow">{state.data.categorie || "Projet"} {state.data.annee || ""}</p><h1>{state.data.titre}<span>.</span></h1><p className="intro">{state.data.resume}</p>{state.data.image && <img className="detail-image" src={state.data.image} alt={state.data.imageAlt || ("Illustration du projet " + state.data.titre)} />}<div className="tags">{(state.data.tags||[]).map(t=><span key={t}>{t}</span>)}</div>{["contexte","objectif","realisation","resultat"].map(k=>state.data[k] && <section key={k}><h2>{k==="realisation"?"Réalisation":k[0].toUpperCase()+k.slice(1)}</h2><p>{state.data[k]}</p></section>)}{state.data.technologies?.length>0 && <section><h2>Technologies</h2><p>{state.data.technologies.join(" · ")}</p></section>}</article>}</Etat></section>;
}
function Skills() {
  const {data,loading,error}=useApi("/api/competences"); const labels=["","Notions","Autonome","Avancé"];
  return <section className="page wrap"><div className="pagehead"><p className="eyebrow">Explorer / 02</p><h1>Compétences<span>.</span></h1><p>Les outils, méthodes et connaissances mobilisés dans mes projets.</p></div><Etat state={{loading,error}}>{data?.length ? <div className="grid">{data.map(group=><article className="card" key={group.groupe}><p className="eyebrow">{group.groupe}</p>{(group.items||[]).map(item=><div className="skill" key={item.nom}><span>{item.nom}</span><small>{labels[item.niveau] || "À préciser"}</small></div>)}</article>)}</div>:<div className="emptybox"><b>02—</b><div><h3>Compétences à compléter.</h3><p>Les technologies et niveaux seront ajoutés après validation.</p></div></div>}</Etat></section>;
}
function About() {
  const profil=useApi("/api/profil"),parcours=useApi("/api/parcours");
  return <section className="page wrap"><div className="pagehead"><p className="eyebrow">Explorer / 03</p><h1>À propos<span>.</span></h1><p>Mon profil, ma formation et les étapes de mon parcours.</p></div><Etat state={profil}>{profil.data && <div className="about card"><p className="eyebrow">Le profil</p><h2>{profil.data.titre}</h2><p>{profil.data.accroche}</p><div className="actions">{profil.data.liens?.github && <a className="more" href={profil.data.liens.github} target="_blank" rel="noreferrer">GitHub ↗</a>}{profil.data.liens?.linkedin && <a className="more" href={profil.data.liens.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}{profil.data.cv && <a className="btn primary" href={profil.data.cv}>Télécharger mon CV ↓</a>}</div></div>}</Etat><div className="heading subsection"><div><p className="eyebrow">Chronologie</p><h2>Parcours<span>.</span></h2></div></div><Etat state={parcours}><Timeline items={parcours.data||[]}/></Etat></section>;
}
function NotFound() { return <section className="page wrap"><p className="eyebrow">Erreur 404</p><h1>Cette page n'existe pas<span>.</span></h1><Link className="btn primary" to="/">Retour à l'accueil</Link></section>; }

export default function App() {
  const [theme,setTheme]=useState(()=>{try{return localStorage.getItem("portfolio-theme")||"dark";}catch{return "dark";}});
  useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem("portfolio-theme",theme);}catch{}},[theme]);
  return <><Header theme={theme} toggle={()=>setTheme(t=>t==="dark"?"light":"dark")}/><main><Routes><Route path="/" element={<Home/>}/><Route path="/projets" element={<Projects/>}/><Route path="/projets/:slug" element={<ProjectDetail/>}/><Route path="/competences" element={<Skills/>}/><Route path="/a-propos" element={<About/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></>;
}