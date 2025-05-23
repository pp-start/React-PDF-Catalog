import React, { useState, useEffect, useMemo } from "react";
import Axios from './Axios';

// CSS of PDF

import { style_list } from './Style';

// Fonts

import RobotoBold from '../fonts/roboto_bold.ttf';
import RobotoMedium from '../fonts/roboto_medium.ttf';
import RobotoMonoItalic from '../fonts/roboto_mono_italic.ttf';

// Images

import Logo from '../images/logo.png';
import FrontPage from '../images/front_page.jpg';
import CompanyPage from '../images/company_page.jpg';

// PDF

import { PDFDownloadLink, Font, Page, Text, View, Document, Image, Link, StyleSheet } from '@react-pdf/renderer';
import JsBarcode from 'jsbarcode';

export default function Main(){

    // Styles

    const styles = StyleSheet.create(style_list);

    // Fonts

    Font.register({
        family: 'roboto_bold',
        src: RobotoBold,
        format: 'truetype',
    });

    Font.register({
        family: 'roboto_mono_italic',
        src: RobotoMonoItalic,
        format: 'truetype',
    });

    Font.register({
        family: 'roboto_medium',
        src: RobotoMedium,
        format: 'truetype',
    });

    Font.registerHyphenationCallback(word => (
        [word]
    ));

    // Current date

    const [currentYear, setCurrentYear] = useState(null);

    useEffect(() => {

        const year = new Date().getFullYear();

        setCurrentYear(year);

    }, []);

    // Modal

    const [modalMessage, setModalMessage] = useState(null);

    const [modal, setModal] = useState({
        show: false, 
        info: false
    });

    function closeModal(){

        setModal({
            show: false,
            info: false
        });

    }

    // Downloading data

    const [receivedData, setReceivedData] = useState(null);

    useEffect(() => {

        getData();

        function getData(){

            let request_type = 'get catalog data';
    
            Axios.post('data.php', { request_type }, { timeout: 10000 }).then(function(response){

                if(response.data.db_data){

                    const data = response.data.db_data;

                    if(!data.products){

                        setModal({show: true, info: true});

                        setModalMessage('There are no products in database');

                    } else {

                        setReceivedData(response.data.db_data);

                    }

                } else {

                    setModal({show: true, info: true});

                    let message = response.data.message ? response.data.message : "There was an error during data download.";

                    setModalMessage(message);

                }

            }).catch((error) => {

                console.warn(error);

                setModal({show: true, info: true});

                setModalMessage('There was an error during data download.');

            });
    
        }

    }, []);

    const [productList, setProductsList] = useState([]);

    useEffect(() => {

        if(receivedData){

            const products = receivedData.products ? receivedData.products : [];

            const categories = receivedData.categories ? receivedData.categories : [];

            const subcategories = receivedData.subcategories ? receivedData.subcategories : [];

            products.forEach(product => {

                const category_id = product.category_id;

                const subcategory_id = product.subcategory_id;

                const category_match = categories.find(item => item.category_id === category_id);

                if(category_match){

                    product.category_name = category_match.category_name;

                }

                const subcategory_match = subcategories.find(item => item.subcategory_id === subcategory_id);

                if(subcategory_match){

                    product.subcategory_name = subcategory_match.subcategory_name;

                }

            });

            const organized = products.reduce((acc, item) => {

                // Main categories

                let category_id = item.category_id;

                let category_name = item.category_name;

                let category_object = acc.find(obj => obj.category_id === category_id);

                const category_data = categories.find(obj => obj.category_id === category_id);

                let category_description = category_data ? category_data.category_description : "";

                if(!category_object){

                    category_object = { category_id: category_id, category_name: category_name, category_description: category_description, subcategories: [] };
  
                    acc.push(category_object);
  
                }

                const main_index = acc.findIndex(obj => obj.category_id === category_id);

                // Subcategories

                let subcategory_id = item.subcategory_id;

                let subcategory_name = item.subcategory_name;

                const subcategories = category_object.subcategories;

                let subcategory_object = subcategories.find(obj => obj.subcategory_id === subcategory_id);
                
                if(!subcategory_object){

                    subcategory_object = { subcategory_id: subcategory_id, subcategory_name: subcategory_name, items: [] };

                    acc[main_index].subcategories.push(subcategory_object);

                }

                // Products

                const sub_index = acc[main_index].subcategories.findIndex(obj => obj.subcategory_id === subcategory_id);

                acc[main_index].subcategories[sub_index].items.push(item);
                
                return acc;

            }, []);

            organized.sort((a, b) => a.category_id.localeCompare(b.category_id));

            organized.forEach(item => {

                item.subcategories.sort((a, b) => a.subcategory_id.localeCompare(b.subcategory_id));

                item.subcategories.forEach(obj => {

                    obj.items.sort((a, b) => a.product_name.localeCompare(b.product_name));

                });

            });

            setProductsList(organized);
            
        }

    }, [receivedData]);

    const [splitProducts, setSplitProducts] = useState([]);

    useEffect(() => {

        if(productList.length > 0){

            const products = [...productList];
        
            const output = [];

            const properties = ['product_number', 'diameter', 'size', 'height', 'temperature_resistance', 'quantity'];

            products.forEach(list => {

                const subcategories = list.subcategories;

                const all_items = subcategories.flatMap(item => item.items);

                const chunked = groupItems(all_items);

                const category_index = parseInt((list.category_id).slice(-1));

                const obj = {category_index: category_index, category_name: list.category_name, category_description: list.category_description, all_items: chunked};

                output.push(obj);

            });

            let pages = 3;

            const sorted_output = output.sort((a, b) => a.category_index - b.category_index);

            sorted_output.forEach(list => {

                pages++;

                const current_pages = list.all_items.length -1;

                list.start_page = pages;

                pages += current_pages;

            });

            const last_item = sorted_output.length -1;

            let total_pages = sorted_output[last_item].start_page + sorted_output[last_item].all_items.length;

            setTotalPages(total_pages);

            setSplitProducts(sorted_output);

            function groupItems(all_items){
            
                let chunks = [];

                let index = 0;

                while (index < all_items.length){

                    let count = 0;

                    let chunkSize = 25;

                    let notNullPropsCount = 0; 

                    for(let i = index; i < all_items.length; i++){

                        let nonNullProps = properties.filter(prop => all_items[i][prop] !== null).length;

                        if(nonNullProps > notNullPropsCount) notNullPropsCount = nonNullProps;

                        if(notNullPropsCount === 2 || notNullPropsCount === 3) chunkSize = 20;

                        else if (notNullPropsCount >= 4) chunkSize = 15;

                        count++;

                        if(count >= chunkSize) break;

                    }

                    chunks.push({
                        items: all_items.slice(index, index + chunkSize),
                        properties_number: notNullPropsCount
                    });

                    index += chunkSize;

                }

                return chunks;

            }

        }

    }, [productList]);

    // Page numbers

    const [totalPages, setTotalPages] = useState(-1);

    let pageNumber = 0;

    function getPageNumber(){
        pageNumber++;
        //console.log(pageNumber);
        if(pageNumber === totalPages){
            pageNumber = 0;
            return "page_"+totalPages;
        }
        return "page_"+pageNumber;
    }

    // PDF document

    const GeneratedPDF = () => (

        <Document>
            {/* Front page */}
            <Page
                style={styles.page}
                onRender={(props) => {
                    const { pageNumber, totalPages } = props;
                    console.log('page ' + pageNumber + " of " + totalPages);
                }}
                id={`${getPageNumber()}`}
            >
                <Image style={styles.fullPageImage} src={FrontPage}/>
            </Page>
            {/* Contents */}
            <Page
                style={styles.page}
                onRender={(props) => {
                    const { pageNumber, totalPages } = props;
                    console.log('page ' + pageNumber + " of " + totalPages);
                }}
                id={`${getPageNumber()}`}
            >
                <View style={styles.contentsPageWrapper}>
                    <View style={styles.contentPageTitleWrapper}>
                        <Text style={styles.contentPageTitle}>Contents</Text>
                    </View>
                    <View style={styles.contentPageSidePanel}>
                        <View style={styles.contentPageSidePanelWhite}></View>
                        <View style={styles.contentPageSidePanelInnerWrapper}>
                            {splitProducts.map((obj, index) => (
                                <View key={index}>
                                    <Link style={styles.contentPageSIdePanelLink} src={"#page_"+(obj.start_page)}><Image style={styles.contentPageSidePanelImage} src={'/images/category_icon_' + (obj.category_index) + '.png'} /></Link>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.contentPageMainPanel}>
                        {splitProducts.map((obj, index) => (
                            <View style={styles.contentPageMainPanelInnerWrapper} key={index}>
                                <Link style={styles.contentPageMainPanelLink} src={"#page_"+(obj.start_page)}>
                                    <View style={styles.contentPageMainPanelTopRow}>
                                        <Text style={styles.contentPageMainPanelCategoryTitle}>{obj.category_name}</Text>
                                        <Text style={styles.contentPageMainPanelCategoryPage}>{obj.start_page}</Text>
                                    </View>
                                </Link>
                                <Text style={styles.contentPageMainPanelCategoryDescription}>{obj.category_description}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
            {/* About company */}
            <Page
                style={styles.page}
                onRender={(props) => {
                    const { pageNumber, totalPages } = props;
                    console.log('page ' + pageNumber + " of " + totalPages);
                }}
                id={`${getPageNumber()}`}
            >
                <View style={styles.companyPage}>
                    <View style={styles.companyPageTextWrapper}>
                        <View style={styles.companyPageTextInnerWrapper}>
                            <Text style={styles.companyPageText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                            <Text style={styles.companyPageText}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum".</Text>
                            <Text style={styles.companyPageText}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', </Text>
                        </View>
                        
                        <View style={styles.companyPageLinkWrapper}>
                            <Link style={styles.companyPageLink} src={"https://company-website.com/"} target={"_blank"}><Text style={styles.companyPageLinkText}>www.company-website.com</Text></Link>
                        </View>
                    </View>
                    
                    {<Image style={styles.fullPageBackground} src={CompanyPage}/>}
                </View>
            </Page>
            {/* Products*/}
            {splitProducts.map((obj, i) => (
                <React.Fragment key={i}>
                    {obj.all_items.map((item, ix) => (
                        <Page
                            style={styles.productPage}
                            onRender={(props) => {
                                const { pageNumber, totalPages } = props;
                                console.log('page ' + pageNumber + " of " + totalPages);
                            }}
                            id={`${getPageNumber()}`}
                            key={ix}
                        >
                            <View style={styles.productPageSidePanel}>
                                {splitProducts.map((category, n) => (
                                    <View key={n} style={(n === i) ? [styles.productPageSidePanelWrapper, styles.White] : styles.productPageSidePanelWrapper}>
                                        <Link style={styles.productPageSidePanelLink} src={"#page_"+(category.start_page)}><Image style={styles.productPageSidePanelImage} src={'/images/category_icon_' + category.category_index + '.png'} /></Link>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.productPageMainPanel}>
                                <View style={styles.productPageMainPanelTopContainer}>
                                    <Text style={styles.productPageMainPanelTopText}>{obj.category_name}</Text>
                                    <View style={styles.productPageMainPanelTopBorder}></View>
                                </View>
                                <View style={styles.productPageMainPanelProductContainer}>
                                    {item.items.map((product, index) => (
                                        <View key={index} style={[styles.singleProductContainer, {marginTop: getMargin(item.properties_number)}, {marginBottom: getMargin(item.properties_number)}]}>
                                            <View style={styles.productTopWrapper}>
                                                <View style={styles.productImageWrapper}>
                                                    <Image style={styles.productImage} src={'/images/' + product.category_id + '_dummy.png'} />
                                                </View>
                                                <View style={styles.productNameOuterWrapper}>
                                                    <View style={styles.productNameWrapper}>
                                                        <Text style={[styles.productName, product.product_name.length < 30 ? styles.productNameNormal : product.product_name.length < 40 ? styles.productNameMedium : styles.productNameSmall]}>{product.product_name}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.barcodeContainer}>
                                                    <Image style={styles.barcodeImage} src={createPNG(product.barcode)} />
                                                    <View style={styles.barcodeTextContainer}>
                                                        <Text style={styles.barcodeText}>{product.barcode}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={[styles.productBottomWrapper, {minHeight: getMinHeight(item.properties_number)}]}>
                                                {product.product_number && <View style={styles.productDetailsRowWrapper}>
                                                    <View style={styles.productDetailsLeftColumn}>
                                                        <Text style={styles.productDetails}>Art.</Text>
                                                    </View>
                                                    <View style={styles.productDetailsRightColumn}>
                                                        <Text style={styles.productDetails}>{product.product_number ? product.product_number : "-"}</Text>
                                                    </View>
                                                </View>}
                                                {product.product_number && <View style={styles.productDetailsBorder}>
                                                </View>}
                                                {product.diameter && <View style={styles.productDetailsRowWrapper}>
                                                    <View style={styles.productDetailsLeftColumn}>
                                                        <Image style={styles.productDiameterImage} src={'/images/icon_diameter.png'} />
                                                    </View>
                                                    <View style={styles.productDetailsRightColumn}>
                                                        <Text style={styles.productDetails}>{product.diameter ? product.diameter + " mm" : "-"}</Text>
                                                    </View>
                                                </View>}
                                                {product.diameter && <View style={styles.productDetailsBorder}>
                                                </View>}
                                                {product.size && <View style={styles.productDetailsRowWrapper}>
                                                    <View style={styles.productDetailsLeftColumn}>
                                                        <Image style={styles.productSizeImage} src={'/images/icon_size.png'} />
                                                    </View>
                                                    <View style={styles.productDetailsRightColumn}>
                                                        <Text style={styles.productDetails}>{product.size ? product.size + " mm" : "-"}</Text>
                                                    </View>
                                                </View>}
                                                {product.size && <View style={styles.productDetailsBorder}>
                                                </View>}
                                                {product.height && <View style={styles.productDetailsRowWrapper}>
                                                    <View style={styles.productDetailsLeftColumn}>
                                                        <Image style={styles.productHeightImage} src={'/images/icon_height.png'} />
                                                    </View>
                                                    <View style={styles.productDetailsRightColumn}>
                                                        <Text style={styles.productDetails}>{product.height ? product.height + " mm" : "-"}</Text>
                                                    </View>
                                                </View>}
                                                {product.height && <View style={styles.productDetailsBorder}>
                                                </View>}
                                                {product.volume && <View style={styles.productDetailsRowWrapper}>
                                                    <View style={styles.productDetailsLeftColumn}>
                                                        <Image style={styles.productVolumeImage} src={'/images/icon_volume.png'} />
                                                    </View>
                                                    <View style={styles.productDetailsRightColumn}>
                                                        <Text style={styles.productDetails}>{product.volume ? product.volume + " ml" : "-"}</Text>
                                                    </View>
                                                </View>}
                                                {product.volume && <View style={styles.productDetailsBorder}>
                                                </View>}
                                                {product.temperature_resistance !== null && <View style={styles.productDetailsRowWrapper}>
                                                    <View style={styles.productDetailsLeftColumn}>
                                                        <Image style={styles.productTemperatureImage} src={'/images/icon_temperature.png'} />
                                                    </View>
                                                    <View style={styles.productDetailsRightColumn}>
                                                        <Text style={styles.productDetails}>{product.temperature_resistance === 1 ? 'YES' : "NO"}</Text>
                                                    </View>
                                                </View>}
                                                {product.temperature_resistance !== null && <View style={styles.productDetailsBorder}>
                                                </View>}
                                                {product.quantity && <View style={styles.productDetailsRowWrapper}>
                                                    <View style={styles.productDetailsLeftColumn}>
                                                        <Image style={styles.productQuantityImage} src={'/images/icon_quantity.png'} />
                                                    </View>
                                                    <View style={styles.productDetailsRightColumn}>
                                                        <Text style={(product.quantity?.length || 0) + (product.batch?.length || 0) <= 5 ? styles.productDetails : styles.productDetailsSmaller}>{product.quantity + " pcs" + (product.batch ? ("/" + product.batch + " set") : "")}</Text>
                                                    </View>
                                                </View>}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                                
                                
                                <View style={styles.productPageFooter}>
                                    <Text
                                        style={styles.footerText}
                                        render={({ pageNumber }) => 
                                        `Product catalog - page ${pageNumber}`}
                                        fixed
                                    />
                                    <Text style={[styles.footerText, styles.footerTextSeparator]}>/</Text>
                                    <Text
                                        style={styles.footerText}
                                        render={({ totalPages }) => 
                                        `${totalPages}`}
                                        fixed
                                    />
                                </View>
                            </View>
                           
                        </Page>
                    ))}
                    
                </React.Fragment>
            ))}

        </Document>
    );

    const getMinHeight = (count) => {

        let height = count * 15.3;

        return height + "px";

    };

    const getMargin = (count) => {

        let margin;

        switch(count){

            case 1:

                margin = "0.6%";

                break;

            case 2:

                margin = "3%";

                break;

            case 3:

                margin = "1.5%";

                break;

            case 4:

                margin = "6.5%";

                break;

            case 5:

                margin = "4.75%";

                break;

            case 6:

                margin = "3.25%";

                break;

            default:

            margin = "1%";

        }

        return margin;

    };

    const memoizedPDF = useMemo(() => (

        <GeneratedPDF 
            splitProducts={splitProducts}
            currentYear={currentYear}
        />

    ), [splitProducts, currentYear]);

    const [ready, setReady] = useState(false);

    useEffect(() => {

        if(splitProducts.length > 0){

            setReady(true);

        }

    },[splitProducts]);

    function createPNG(barcodeValue) {

        const canvas = document.createElement('canvas');

        JsBarcode(canvas, barcodeValue, {
            format: 'EAN13',
            width: 2,
            height: 25,
            margin: 0,
            displayValue: false,
        });

        return canvas.toDataURL('image/png');

    }

    return (
        <div id="app-outer-container">
            <div className="app-outer-wrapper">
                <img alt="logo" src={Logo} className="logo-image"></img>
                {ready && 
                    <PDFDownloadLink
                        document={memoizedPDF}
                        fileName={"Company - catalog " + currentYear + ".pdf"}
                    >
                        {({ loading }) => (
                            <div>
                                {loading && 
                                    <div className="container">    
                                        <div className="progress progress-striped">
                                            <div className="progress-bar">
                                            </div>                       
                                        </div> 
                                    </div>
                                }
                                {!loading && 
                                    <div id="button-container">
                                        <button className="button-download">Download</button>
                                    </div>
                                }
                            </div>
                        )}
                    </PDFDownloadLink>
                }
            </div>
            {modal.show &&
                <div className="modal-overlay" onClick={() => closeModal()}>
                    {/* Informacje */}
                    {modal.info && 
                        <div className="modal" onClick={(e)=>e.stopPropagation()}>
                            <div className="modal-header">
                                <h2 className="modal-title">Information</h2>
                            </div>
                            <div className="modal-body">
                                {modalMessage && 
                                    <div className="modal-info-wrapper">
                                        <p className="modal-info-text modal-success-text">{modalMessage}</p>
                                    </div>
                                }                   
                            </div>
                            <div className="modal-footer">
                                <div className="modal-buttons-wrapper"> 
                                    {modalMessage && <button className="user-top-panel-button" onClick={() => closeModal()}>OK</button>}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
};