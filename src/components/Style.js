export const style_list = {

    // Front page

    page: {
        flexDirection: 'column'
    },

    fullPageImage: {
        width: '99.99%',
        height: '99.99%',
    },

    // Content page

    contentsPageWrapper: {
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "#efefef",
    },

    contentPageTitleWrapper: {
        width: '100%',
        position: 'absolute',
        top: 50,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },

    contentPageTitle: {
        fontFamily: 'roboto_bold',
        textTransform: 'uppercase',
        fontSize: 40,
    },

    contentPageSidePanel: {
        width: '12%',
        height: '100%',
        backgroundColor: '#ee7727',
        flexDirection: 'column',
    },

    contentPageSidePanelWhite: {
        display: 'block',
        width: '100%',
        height: '50px',
        backgroundColor: "#efefef",
        marginTop: '50px',
    },

    contentPageSidePanelInnerWrapper: {
        marginTop: '30px',
    },

    contentPageSIdePanelLink: {
        width: '50px',
        display: 'block',
        margin: 'auto',
        marginTop: '2px',
        marginBottom: '22px',
    },

    contentPageSidePanelImage: {
        height: '50px',
        width: '50px',
    },

    // Main panel

    contentPageMainPanel: {
        width: '88%',
        height: '100%',
        marginTop: '100px',
        padding: '30px',
        flexDirection: 'column',
    },

    contentPageMainPanelInnerWrapper: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: '20px',
        height: '54px',
    },

    contentPageMainPanelLink: {
        textDecoration: 'none',
    },

    contentPageMainPanelTopRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px dashed #000',
        paddingBottom: '2px',
    },

    contentPageMainPanelCategoryTitle: {
        fontFamily: 'roboto_bold',
        fontSize: 14,
        letterSpacing: '0.3px',
        color: '#000',
    },

    contentPageMainPanelCategoryPage: {
        fontFamily: 'roboto_bold',
        fontSize: 14,
        color: '#000',
    },

    contentPageMainPanelCategoryDescription: {
        fontFamily: 'roboto_medium',
        fontSize: 12,
        textAlign: 'justify',
        marginTop: '5px',
    },

    // About us page

    companyPage: {
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 2,
    },

    companyPageTextWrapper: {
        width: '100%',
        height: '100%',
        paddingTop: '110px',
        paddingLeft: '30px',
        paddingRight: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    companyPageText: {
        fontFamily: 'roboto_bold', 
        fontSize: 14,
        textAlign: 'justify',
        textIndent: '30px',
        marginTop: '15px',
    },

    companyPageLinkWrapper:  {
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
    },

    companyPageLink: {
        textDecoration: 'none',
        width: '60%',
    },

    companyPageLinkText: {
        fontFamily: 'roboto_bold', 
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#000',
        letterSpacing: '2px',
    },

    fullPageBackground: {
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 1,
    },

    // Products page

    productPage: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: "#efefef",
    },

    // Side panel

    productPageSidePanel: {
        width: '12%',
        height: '100%',
        backgroundColor: '#ee7727',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },

    productPageSidePanelWrapper: {
        paddingTop: '10px',
        paddingBottom: '10px',
        width: '100%',
    },

    White: {
        backgroundColor: "#efefef",
    },

    productPageSidePanelLink: {
        width: '50px',
        display: 'block',
        margin: 'auto',
    },

    productPageSidePanelImage: {
        height: '50px',
        width: '50px',
    },

    // Main panel with products

    productPageMainPanel: {
        width: '88%',
        height: '100%',
        padding: '10px',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    productPageMainPanelTopContainer: {
        width: '100%',
        textAlign: 'center',
    },

    productPageMainPanelTopText: {
        fontFamily: 'roboto_bold', 
        fontSize: 15,
        textTransform: 'uppercase',
    },

    productPageMainPanelTopBorder: {
        width: '100%',
        height: '2px',
        backgroundColor: '#000',
        marginTop: '5px',
    },

    // Products

    productPageMainPanelProductContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    singleProductContainer: {
        display: 'flex',
        flexBasis: '19%',
        marginLeft: '0.5%',
        marginRight: '0.5%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '3px',
        backgroundColor: '#fee',
    },

    singleProductContainerNormal: {
        marginTop: '0.75%',
        marginBottom: '0.75%',
    },

    singleProductContainerLarge: {
        marginTop: '0.75%',
        marginBottom: '0.75%',
    },

    // Product picture and name

    productTopWrapper: {
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    productImageWrapper: {
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    productImage: {
        width: '60px',
        height: '60px',
        marginTop: '2px',
        marginBottom: '2px',
    },

    productNameOuterWrapper: {
        width: '100%',
        flexGrow: 1,
        justifyContent: 'center',
    },

    productNameWrapper: {
        width: '100%',
        minHeight: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EE7F44',
        marginBottom: '2px',
        padding: '2px',
    },

    productName: {
        width: '98%',
        wordWrap: 'break-word',  
        whiteSpace: 'normal',
        fontFamily: 'roboto_bold', 
        textAlign: 'center',
        textTransform: 'uppercase',
    },

    productNameNormal: {
        fontSize: 10,
        lineHeight: 1.1,
    },

    productNameMedium: {
        fontSize: 8,
        lineHeight: 1.15,
    },

    productNameSmall: {
        fontSize: 7,
        lineHeight: 1.2,
    },

    // Barcode 

    barcodeContainer: {
        width: '95%',
        paddingTop: 3,
        backgroundColor: '#fee',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: '2px',
    },

    barcodeImage: {
        width: '95%',
    },

    barcodeTextContainer: {
        width: '95%',
    },

    barcodeText: {
        fontSize: 10,
        textAlign: 'center',
        paddingBottom: 3,
    },

    // Product properties

    productBottomWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    productDetailsRowWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '2px',
        paddingBottom: '2px',
    },

    productDetailsBorder: {
        width: '100%',
        height: '1px',
        backgroundColor: '#000',
    },

    productDetailsLeftColumn: {
        flexBasis: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    productDetails: {
        fontFamily: 'roboto_medium', 
        fontSize: 9,
    },

    productDetailsSmaller: {
        fontFamily: 'roboto_medium', 
        fontSize: 8,
    },

    productDiameterImage: {
        width: '10px',
        height: '10px',
        marginRight: '2px',
    },

    productSizeImage: {
        width: '12px',
        height: '10px',
        marginRight: '2px',
    },

    productHeightImage: {
        width: '11px',
        height: '10px',
        marginRight: '2px',
    },

    productTemperatureImage: {
        width: '14px',
        height: '9px',
        marginRight: '2px',
    },

    productQuantityImage: {
        width: '12px',
        height: '9px',
        marginRight: '2px',
    },

    productDetailsRightColumn: {
        flexBasis: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Footer

    productPageFooter: {
        borderTop: '1px solid #ddd',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '5px',
    },

    footerText: {
        fontSize: 10,
    },

    footerTextSeparator: {
        marginLeft: '1px',
        marginRight: '1px',
    },

};