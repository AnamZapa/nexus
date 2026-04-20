import Sidebar from '..components/Sidebar'; 
import Card from '../components/Card'
import Footer from '../components/Footer'
import './Services.css'


const Services = function(){
    return(
        <main>
            <Sidebar/>
            <section>
                <h1>Bienvenido</h1>
                <h2>Conoce nuestros programas</h2>
                <div>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <Footer/>
            </section>
        </main>
    )
}

export default Services