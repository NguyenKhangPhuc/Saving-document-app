import { useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../Small-Elements/Header";
import { url } from "./ProvidePage";
import searchLogo from "../Imgs/search.png"
import Introduction from "../Small-Elements/Introduction";
import { Category } from "./ProvidePage";
function SavingPage() {
    const navigate = useNavigate()

    let [list, setList] = useState([])
    let [listItem, setListItem] = useState([])
    let [data, setData] = useState(null)
    let [itemId, setItemId] = useState('')
    let [filterList, setFilterList] = useState([])
    const [showInput, setShowInput] = useState(false)
    const [showText, setShowText] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [showMediaUrl, setShowMediaUrl] = useState(false)
    const [showBrief, setShowBrief] = useState(false)
    const [showAssessment, setShowAssessment] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showInteraction, setShowInteraction] = useState(false)
    const [showStartDate, setShowStartDate] = useState(false)
    const [showEndDate, setShowEndDate] = useState(false)
    const [showIndex, setShowIndex] = useState(null)
    const [showTitile, setShowTitle] = useState(false)
    let [updateText, setUpdateText] = useState('')
    let [updateImgs, setUpdateImgs] = useState('')
    let [updateMediaUrl, setUpdateMediaUrl] = useState('')
    let [updateBrief, setUpdateBrief] = useState('')
    let [updateAssessment, setUpdateAssessment] = useState('')
    let [updateForm, setUpdateForm] = useState('')
    let [updateInteract, setUpdateInteract] = useState('')
    let [updateStartDate, setUpdateStartDate] = useState('')
    let [updateEndDate, setUpdateEndDate] = useState('')
    let [updateTitle, setUpdateTitle] = useState('')
    let [showFilter, setShowFilter] = useState(false)
    let [showCategory, setShowCategory] = useState(false)
    useEffect(() => {
        axios.get(url)
            .then(res => {
                list = res.data
                setList(list)
                console.log(list)
                data = res.data
                setData(data)
            })
            .catch(err => console.log(err))

        axios.get(url + '/get-item')
            .then(res => {
                itemId = res.data[0]._id
                setItemId(itemId)
                listItem = res.data[0].itemList
                setListItem(listItem)
                console.log(listItem)
            })
            .catch(err => console.log(err))
    }, [])
    const deleteActivity = async (deleteIndex, id) => {
        const updateList = list.filter((activity, index) => {
            return index != deleteIndex
        })
        list = updateList
        setList(list)
        await axios.post(url + '/update', { id, list })
    }
    const saveUpdateText = async (id) => {
        await axios.post(url + '/update-text', { id, updateText })
            .then(res => {
                console.log(res)
                if (res) {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    }
    const saveUpdateImgs = async (id) => {
        await axios.post(url + '/update-imgs', { id, updateImgs })
            .then(res => {
                console.log(res)
                if (res) {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    }
    const saveUpdateMediaUrl = async (id) => {
        await axios.post(url + '/update-mediaUrl', { id, updateMediaUrl })
            .then(res => {
                console.log(res)
                if (res) {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    }
    const saveUpdateBrief = async (id) => {
        await axios.post(url + '/update-brief', { id, updateBrief })
            .then(res => {
                console.log(res)
                if (res) {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    }
    const saveUpdateAssessment = async (id) => {
        await axios.post(url + '/update-assessment', { id, updateAssessment })
            .then(res => {
                console.log(res)
                if (res) {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    }
    const saveUpdateForm = async (id) => {
        await axios.post(url + '/update-form', { id, updateForm })
            .then(res => {
                console.log(res)
                if (res) {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    }
    const saveUpdateInteract = async (id) => {
        await axios.post(url + '/update-intNum', { id, updateInteract })
            .then(res => {
                console.log(res)
                if (res) {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    }
    const saveUpdateStartDate = async (id) => {
        await axios.post(url + '/update-startDate', { id, updateStartDate })
            .then(res => {
                console.log(res)
                if (res) {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    }
    const saveUpdateEndDate = async (id) => {
        await axios.post(url + '/update-endDate', { id, updateEndDate })
            .then(res => {
                console.log(res)
                if (res) {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    }
    const saveUpdateTitle = async (id) => {
        await axios.post(url + '/update-name', { id, updateTitle })
            .then(res => {
                console.log(res)
                if (res) {
                    navigate('/home')
                }
            })
            .catch(err => console.log(err))
    }
    const searchingResult = async (value) => {
        const result = data?.filter((act, index) => {
            return act.actName.toLowerCase().includes(value.toLowerCase())
        })
        console.log(result)
        setList(result)
    }
    const addItem = async (value) => {

        listItem = [...listItem, { name: value, chose: false }]
        setListItem(listItem)
        await axios.post(url + '/update-item', { itemId, listItem })
    }
    const deleteItem = async (name) => {
        const deleteResult = listItem?.filter((item, index) => {
            return item.name != name
        })
        listItem = deleteResult
        setListItem(listItem)
        await axios.post(url + '/delete-item', { itemId, listItem })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    }
    const chosenItem = async (itemIndex) => {
        const filterChosen = listItem.map((item, index) => {
            if (itemIndex == index) {
                return { ...item, chose: item.chose == true ? false : true }
            } else {
                return item
            }
        })
        listItem = filterChosen
        setListItem(listItem)


    }
    const filterChosenItems = () => {
        const filterAct = listItem.map((item, index) => {
            if (item.chose == true) {
                const checkRemoveItem = filterList.some((item2, index) => {
                    return filterList[index] == item.name
                })
                if (checkRemoveItem == false) {
                    return filterList = [...filterList, `${item.name}`]
                }

            } else if (item.chose == false) {
                const checkRemoveItem = filterList.some((item2, index) => {
                    return filterList[index] == item.name
                })
                if (checkRemoveItem == true) {
                    const removeIndex = filterList.indexOf(item.name)
                    setFilterList(filterList.splice(removeIndex, 1))
                }
            }
        })
        setFilterList(filterList)
        console.log(filterList)

        const filterActResult = data?.filter((act, index) => {
            return filterList.every(e => act.filterList.includes(e))
        })
        console.log(filterActResult)
        list = filterActResult
        setList(list)
    }

    const filterChosenItemsAct = async (id) => {
        const filterAct = listItem.map((item, index) => {
            if (item.chose == true) {
                const checkRemoveItem = filterList.some((item2, index) => {
                    return filterList[index] == item.name
                })
                if (checkRemoveItem == false) {
                    return filterList = [...filterList, `${item.name}`]
                }

            } else if (item.chose == false) {
                const checkRemoveItem = filterList.some((item2, index) => {
                    return filterList[index] == item.name
                })
                if (checkRemoveItem == true) {
                    const removeIndex = filterList.indexOf(item.name)
                    setFilterList(filterList.splice(removeIndex, 1))
                }
            }
        })
        setFilterList(filterList)
        await axios.post(url + '/update-filterList', { id, filterList })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="saving_page_layout">
            <MobileFilter showFilter={showFilter} setShowFilter={setShowFilter} searchingResult={searchingResult} setShowInput={setShowInput} showInput={showInput} listItem={listItem} addItem={addItem} chosenItem={chosenItem} deleteItem={deleteItem} filterChosenItems={filterChosenItems} setList={setList} data={data} />
            <Header />

            <div className="hamburger_icon" onClick={() => setShowFilter(!showFilter)}>☰</div>
            <div className="lists_position">

                <div className="filter_place">
                    <div className="searching_place">
                        <div className="search_logo" style={{ backgroundImage: `url("${searchLogo}")` }}></div>
                        <input type="text" placeholder="Nhập tên hoạt động" className="searching_input" onChange={(e) => searchingResult(e.target.value)} />
                    </div>
                    <div className="add_item" onClick={() => setShowInput(!showInput)}>+Thêm mục</div>
                    {showInput == true && <input type="text" className="add_input" placeholder="+Thêm mục" onKeyDown={(e) => { if (e.key == "Enter") { addItem(e.target.value) } }} />}
                    <div className="item_list">
                        {listItem?.map((item, index) => {
                            return (
                                <div className="item_detail">
                                    <div className="item_title">{index + 1}. {item.name}</div>
                                    <button className="delete_item" onClick={() => deleteItem(item.name)}>Xóa</button>
                                    {item.chose == false ? <div className="chosen_item_x" onClick={() => chosenItem(index)}></div> : <div className="chosen_item_y" onClick={() => chosenItem(index)}>✔</div>}

                                </div>
                            )
                        })}
                        <div className="filter_button_place">
                            <button className="filter_button" onClick={() => filterChosenItems()}>Lọc</button>
                            <div style={{ cursor: 'pointer' }} onClick={() => setList(data)}>resest</div>
                        </div>

                    </div>
                </div>
                {list?.map((acitivities, index) => {
                    return (
                        <div className="each_list_place" onClick={() => setShowIndex(index)}>

                            {showIndex == index && showTitile == true ?
                                <div className="update_place">
                                    <div className="activity_title">Tên hoạt động</div>
                                    <input type="text" className="update_input" onChange={(e) => setUpdateTitle(e.target.value)} />
                                    <button className="save_update_button" onClick={() => saveUpdateTitle(acitivities._id)} >Lưu</button>
                                </div>
                                :
                                <div className="activity_info" >
                                    <div className="activity_title">Tên hoạt động:</div>
                                    <div className="activity_details">{acitivities.actName}</div>
                                    <div className="update_text" onClick={() => setShowTitle(true)}>sửa</div>
                                </div>
                            }
                            {showIndex == index && showText == true ?
                                <div className="update_place">
                                    <div className="activity_title">Văn bản:</div>
                                    <input type="text" className="update_input" onChange={(e) => setUpdateText(e.target.value)} />
                                    <button className="save_update_button" onClick={() => saveUpdateText(acitivities._id)} >Lưu</button>
                                </div>
                                :
                                <div className="activity_info" >
                                    <div className="activity_title">Văn bản:</div>
                                    <div className="activity_details">{acitivities.actText}</div>
                                    <div className="update_text" onClick={() => setShowText(true)}>sửa</div>
                                </div>
                            }
                            {showIndex == index && showImg == true ?
                                <div className="update_place">
                                    <div className="activity_title">Hình ảnh: </div>
                                    <input type="text" className="update_input" onChange={(e) => setUpdateImgs(e.target.value)} />
                                    <button className="save_update_button" onClick={() => saveUpdateImgs(acitivities._id)}>Lưu</button>
                                </div>
                                :
                                <div className="activity_info">
                                    <div className="activity_title">Hình ảnh:</div>
                                    <div className="activity_details">{acitivities.actImgs}</div>
                                    <div className="update_text" onClick={() => setShowImg(true)}>sửa</div>
                                </div>
                            }
                            {showIndex == index && showMediaUrl == true ?
                                <div className="update_place">
                                    <div className="activity_title">Link truyền thông:</div>
                                    <input type="text" className="update_input" onChange={(e) => setUpdateMediaUrl(e.target.value)} />
                                    <button className="save_update_button" onClick={() => saveUpdateMediaUrl(acitivities._id)}>Lưu</button>
                                </div>
                                :
                                <div className="activity_info">
                                    <div className="activity_title">Link truyền thông:</div>
                                    <div className="activity_details">{acitivities.mediaUrl}</div>
                                    <div className="update_text" onClick={() => setShowMediaUrl(true)}>sửa</div>
                                </div>
                            }
                            {showIndex == index && showBrief == true ?
                                <div className="update_place">
                                    <div className="activity_title">Tóm tắt hoạt động:</div>
                                    <input type="text" className="update_input" onChange={(e) => setUpdateBrief(e.target.value)} />
                                    <button className="save_update_button" onClick={() => saveUpdateBrief(acitivities._id)}>Lưu</button>
                                </div>
                                :
                                <div className="activity_info">
                                    <div className="activity_title">Tóm tắt hoạt động:</div>
                                    <div className="activity_details">{acitivities.actBrief}</div>
                                    <div className="update_text" onClick={() => setShowBrief(true)}>sửa</div>
                                </div>
                            }
                            {showIndex == index && showAssessment == true ?
                                <div className="update_place">
                                    <div className="activity_title">Đánh giá hoạt động:</div>
                                    <input type="text" className="update_input" onChange={(e) => setUpdateAssessment(e.target.value)} />
                                    <button className="save_update_button" onClick={() => saveUpdateAssessment(acitivities._id)}>Lưu</button>
                                </div>
                                :
                                <div className="activity_info">
                                    <div className="activity_title">Đánh giá hoạt động:</div>
                                    <div className="activity_details">{acitivities.actAssessment}</div>
                                    <div className="update_text" onClick={() => setShowAssessment(true)}>sửa</div>
                                </div>
                            }
                            {showIndex == index && showForm == true ?
                                <div className="update_place">
                                    <div className="activity_title">Hình thức:</div>
                                    <input type="text" className="update_input" onChange={(e) => setUpdateForm(e.target.value)} />
                                    <button className="save_update_button" onClick={() => saveUpdateForm(acitivities._id)}>Lưu</button>
                                </div>
                                :
                                <div className="activity_info">
                                    <div className="activity_title">Hình thức:</div>
                                    <div className="activity_details">{acitivities.form}</div>
                                    <div className="update_text" onClick={() => setShowForm(true)}>sửa</div>
                                </div>
                            }
                            {showIndex == index && showInteraction == true ?
                                <div className="update_place">
                                    <div className="activity_title">Lượt tương tác:</div>
                                    <input type="text" className="update_input" onChange={(e) => setUpdateInteract(e.target.value)} />
                                    <button className="save_update_button" onClick={() => saveUpdateInteract(acitivities._id)}>Lưu</button>
                                </div>
                                :
                                <div className="activity_info">
                                    <div className="activity_title">Lượt tương tác:</div>
                                    <div className="activity_details">{acitivities.interactionNum}</div>
                                    <div className="update_text" onClick={() => setShowInteraction(true)}>sửa</div>
                                </div>
                            }
                            {showIndex == index && showStartDate == true ?
                                <div className="update_place">
                                    <div className="activity_title">Ngày bắt đầu:</div>
                                    <input type="text" className="update_input" onChange={(e) => setUpdateStartDate(e.target.value)} />
                                    <button className="save_update_button" onClick={() => saveUpdateStartDate(acitivities._id)}>save</button>
                                </div>
                                :
                                <div className="activity_info">
                                    <div className="activity_title">Ngày bắt đầu:</div>
                                    <div className="activity_details">{acitivities.startDate}</div>
                                    <div className="update_text" onClick={() => setShowStartDate(true)}>sửa</div>
                                </div>
                            }

                            {showIndex == index && showEndDate == true ?
                                <div className="update_place">
                                    <div className="activity_title"> Ngày kết thúc:</div>
                                    <input type="text" className="update_input" onChange={(e) => setUpdateEndDate(e.target.value)} />
                                    <button className="save_update_button" onClick={() => saveUpdateEndDate(acitivities._id)}>Lưu</button>
                                </div>
                                :
                                <div className="activity_info">
                                    <div className="activity_title">Ngày kết thúc:</div>
                                    <div className="activity_details">{acitivities.endDate}</div>
                                    <div className="update_text" onClick={() => setShowEndDate(true)}>sửa</div>
                                </div>
                            }
                            {showIndex == index && showCategory == true ?
                                <div className="choose_item_place">
                                    <div className="off_item" onClick={() => setShowCategory(false)}>X</div>
                                    <div className="choose_item_title">Sửa mục hoạt động: {acitivities.actName}</div>
                                    <div className="item_list">
                                        {listItem?.map((item, index) => {
                                            return (
                                                <div className="item_detail">
                                                    <div className="item_title">{index + 1}. {item.name}</div>
                                                    <button className="delete_item" onClick={() => deleteItem(item.name)}>delete</button>
                                                    {item.chose == false ? <div className="chosen_item_x" onClick={() => chosenItem(index)}></div> : <div className="chosen_item_y" onClick={() => chosenItem(index)}>✔</div>}

                                                </div>
                                            )
                                        })}
                                        <div className="filter_button_place"><button className="filter_button" onClick={() => filterChosenItemsAct(acitivities._id)}>Lưu</button></div>
                                    </div>
                                </div>
                                :
                                <div className="activity_info">
                                    <div className="activity_title">Thuộc mục: </div>
                                    <div className="activity_details" style={{ gap: "2em" }}>{acitivities.filterList?.map((item, index) => {
                                        return (
                                            <div className="item">{acitivities.filterList[index]}</div>
                                        )
                                    })}</div>
                                    <div className="update_text" onClick={() => setShowCategory(true)}>sửa</div>
                                </div>
                            }

                            <div className="button_place">
                                <button className="bin-button" onClick={() => deleteActivity(index, acitivities._id)}>
                                    <svg
                                        className="bin-top"
                                        viewBox="0 0 39 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                                        <line
                                            x1="12"
                                            y1="1.5"
                                            x2="26.0357"
                                            y2="1.5"
                                            stroke="white"
                                            stroke-width="3"
                                        ></line>
                                    </svg>
                                    <svg
                                        className="bin-bottom"
                                        viewBox="0 0 33 39"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <mask id="path-1-inside-1_8_19" fill="white">
                                            <path
                                                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                            ></path>
                                        </mask>
                                        <path
                                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                            fill="white"
                                            mask="url(#path-1-inside-1_8_19)"
                                        ></path>
                                        <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                                        <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Introduction />
        </div>
    );
}
const MobileFilter = ({ searchingResult, setShowInput, showInput, addItem, listItem, deleteItem, chosenItem, filterChosenItems, setList, data, showFilter, setShowFilter }) => {

    return (
        <div className="mobile_filter">
            {showFilter == true && <div className="hamburger_icon" onClick={() => setShowFilter(!showFilter)}>☰</div>}
            {showFilter == true &&
                <div className="filter_place_mobile">
                    <div className="searching_place">
                        <div className="search_logo" style={{ backgroundImage: `url("${searchLogo}")` }}></div>
                        <input type="text" placeholder="Nhập tên hoạt động" className="searching_input" onChange={(e) => searchingResult(e.target.value)} />
                    </div>
                    <div className="add_item" onClick={() => setShowInput(!showInput)}>+Thêm mục</div>
                    {showInput == true && <input type="text" className="add_input" placeholder="+Thêm mục" onKeyDown={(e) => { if (e.key == "Enter") { addItem(e.target.value) } }} />}
                    <div className="item_list">
                        {listItem?.map((item, index) => {
                            return (
                                <div className="item_detail">
                                    <div className="item_title">{index + 1}. {item.name}</div>
                                    <button className="delete_item" onClick={() => deleteItem(item.name)}>Xóa</button>
                                    {item.chose == false ? <div className="chosen_item_x" onClick={() => chosenItem(index)}></div> : <div className="chosen_item_y" onClick={() => chosenItem(index)}>✔</div>}

                                </div>
                            )
                        })}
                        <div className="filter_button_place">
                            <button className="filter_button" onClick={() => filterChosenItems()}>Lọc</button>
                            <div style={{ cursor: 'pointer' }} onClick={() => setList(data)}>resest</div>
                        </div>

                    </div>

                </div>}
        </div>
    )
}
export default SavingPage