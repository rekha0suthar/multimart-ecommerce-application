import React, { useEffect, useState } from "react"
import Helmet from "../components/Helmet/Helmet"
import { Container, Row, Col } from "reactstrap"
import heroImg from "../assets/images/hero-img.png"
import counterImg from "../assets/images/counter-timer-img.png"
import "../styles/home.css"
import { Link } from "react-router-dom"
import  {motion} from "framer-motion"
import Services from "../services/Services"
import ProductList from "../components/UI/ProductList"
import Clock from "../components/UI/Clock"
import useGetData from "../custom-hooks/useGetData"
const Home = () => {
  const {data: products, loading} = useGetData('products')
  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setBestSalesProduct] = useState([])
  const [mobileProducts, setMobileroducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])  
  const [popularProducts, setPopularProducts] = useState([])
  const year = new Date().getFullYear()

  useEffect(() => {
    const filteredTrendingProducts = products.filter(item => item.category === "chair")
    setTrendingProducts(filteredTrendingProducts)

    const filteredBestSalesProducts = products.filter(item => item.category === "sofa")
    setBestSalesProduct(filteredBestSalesProducts)

    const filteredMobileProducts = products.filter(item => item.category === "mobile")
    setMobileroducts(filteredMobileProducts)

    const filteredWirelessProducts = products.filter(item => item.category === "wireless")
    setWirelessProducts(filteredWirelessProducts)

    const filteredPopularProducts = products.filter(item => item.category === "watch")
    setPopularProducts(filteredPopularProducts)
  }, [products])

  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero_content">
                <p className="hero_subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimallistic & Modern</h2>
                <p>With multimart</p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy_btn"><Link to="/shop">SHOP NOW</Link></motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero_img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending_products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Trending Products</h2>
            </Col>
            {loading ? <h5 className="fw-bold">Loading.....</h5> : <ProductList data={trendingProducts} /> }
          </Row>
        </Container>
      </section>
      <section className="best_sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section_title">Best Sales</h2>
            </Col>
            {loading ? <h5 className="fw-bold">Loading.....</h5> : <ProductList data={bestSalesProducts} /> }
          </Row>
        </Container>
      </section>
      <section className="timer_count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count_down_col">
              <div className="clock_top_content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-6 mb-32">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button whileTap={{ scale: 1.2 }} className="buy_btn store_btn"><Link to="/shop">Visit Store</Link></motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end counter_img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new_arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section_title">New Arrivals</h2>
            </Col>
            {loading ? <h5 className="fw-bold">Loading.....</h5> : <ProductList data={mobileProducts} /> }
            {loading ? <h5 className="fw-bold">Loading.....</h5> : <ProductList data={wirelessProducts} /> }
          </Row>
        </Container>
        </section>
        <section className="popular_category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section_title">Popular in Category</h2>
            </Col>
            {loading ? <h5 className="fw-bold">Loading.....</h5> : <ProductList data={popularProducts} /> }
          </Row>
        </Container>
        </section>
    </Helmet>
  )
}

export default Home