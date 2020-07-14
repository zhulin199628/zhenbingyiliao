const menus = [
    {
        title: "概览",
        icon: "GlISvg",
        key: "overview",
        childs: [
            {
                key: "/zhenbing/dashboard/index",
                title: "看板",
                component: "Dsahboard",
            }
        ]
    },
    {
        title: "产品管理",
        icon: "ProSvg",
        key: "proicon",
        childs: [
            {
                key: "/zhenbing/product/category",
                title: "产品类别",
                component: "Category"
            },
            {
                key: "/zhenbing/product/proList",
                title: "产品列表",
                component:"ProductList"
            }
        ]
    },
    {
        title: "售后管理",
        icon: "ScaleSvg",
        key:"after",
        childs: [
            {
                key: "/zhenbing/after-sale/afterList",
                title: "售后列表",
                component: "AfterList"
            }
        ]
            
    },
    {
        title: "用户管理",
        icon: "UserSvg",
        key: "usermag",
        childs: [
            {
                key: "/zhenbing/user-management/Operation-management",
                title: "运营管理",
                component: "Operation"
            },
            {
                key: "/zhenbing/user-management/customer",
                title: "客户管理",
                component: "Customer"
            }
        ]
    },
    {
        title: "通知管理",
        icon: "TzSvg",
        key: "notice",
        childs: [
            {
                key: "/zhenbing/Notice/pop-management",
                title: "弹窗消息",
                component: "Pop"
            }
        ]
    },
    {
        title: "系统设置",
        icon: "SysSvg",
        key: "system",
        childs: [
            {
                key: "/zhenbing/system/information",
                title:"我的信息",
                component: "Information"
            }
        ]
    }
]

export default menus