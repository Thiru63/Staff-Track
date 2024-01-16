// authentication
let token=localStorage.getItem('token')

 if(!token){
    window.location='../index.html'
    alert('Please Login to access data')
 }
 let sort=document.getElementById('sort')
 let filterByDepartment=document.getElementById('filterbydepartment')
 let filterByGender=document.getElementById('filterbygender')

 const displayData=(data,page)=>{
    let mainSection=document.getElementById('employeedata')
    
    mainSection.innerHTML=""
    
    data.data.forEach((ele,inx)=>{
      let card=document.createElement('div')
      card.setAttribute('class','card')
      let ch=document.createElement('h2')
      ch.setAttribute('class','card-heading')
      ch.innerText='Staff Track'
      let ci=document.createElement('div')
      ci.setAttribute('class','card-img')
      let img=document.createElement('img')
      img.src=ele.image
      img.alt=ele.name
      ci.append(img)
      let cn=document.createElement('h3')
      cn.setAttribute('class','card-name')
      cn.innerText=ele.name
      let cb=document.createElement('div')
      cb.setAttribute('class','card-body')
      let cpd=document.createElement('p')
      cpd.setAttribute('class','department')
      cpd.innerText=ele.department
      let cpg=document.createElement('p')
      cpg.setAttribute('class','gender')
      cpg.innerText=ele.gender
      let cps=document.createElement('p')
      cps.setAttribute('class','salary')
      cps.innerText=ele.salary
      
     
      
     
      cb.append(cpd,cpg,cps)
      card.append(ch,ci,cn,cb)
      mainSection.append(card)
      
    })

    let pagination=document.getElementById('pagination')
    pagination.innerHTML=""
   
    let cp=document.createElement('p')
      cp.setAttribute('id','cpage')
      cp.innerText=`${page} page of ${data.totalPages}`
    let prev=document.createElement('button')
      prev.setAttribute('id','prev')
      prev.innerText='Prev'
      prev.addEventListener('click',(e)=>{
        e.preventDefault()
        if(filterByDepartment.value){
            getData(Number(page)-1,sort.value,'department',filterByDepartment.value)
        }else if(filterByGender.value){
            getData(Number(page)-1,sort.value,'gender',filterByGender.value)
        }else{
            getData(Number(page)-1,sort.value)
        }
    })
      if(page==1){
        prev.setAttribute('disabled',true)
      }

      
      let next=document.createElement('button')
      next.setAttribute('id','next')
      next.innerText='Next'
      next.addEventListener('click',(e)=>{
        e.preventDefault()
        console.log('s')
        if(filterByDepartment.value){
            getData(Number(page)+1,sort.value,'department',filterByDepartment.value)
        }else if(filterByGender.value){
            getData(Number(page)+1,sort.value,'gender',filterByGender.value)
        }else{
            getData(Number(page)+1,sort.value)
        }
    })
      if(page==data.totalPages){
        next.setAttribute('disabled',true)
      }

      pagination.append(prev,cp,next)
    

   

 }

 const getData= async (page,sort,filterBy,filterValue)=>{

    try {
        console.log(page,sort,filterBy,filterValue)
        let url
        if(sort && (filterBy && filterValue)){
            console.log('bt')
            url=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=6&sort=salary&order=${sort}&filterBy=${filterBy}&filterValue=${filterValue}`
        }else if(sort){

            url=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=6&sort=salary&order=${sort}`

        }else if(filterBy && filterValue){
            url=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=6&filterBy=${filterBy}&filterValue=${filterValue}`
        } else{
            url=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=6`
        }
        
        let response= await fetch(url) 
        let data=await response.json()
        console.log(data)
        if(data?.data?.length>0){
            displayData(data,page)
        }else{
            alert('Something error occurred so please try again later')
        }
        
    } catch (error) {
        console.log('e'+ error)
        alert('Something error occurred so please try again later')
    }
   
 }

 getData(1)

 
 

 sort.addEventListener('change',(e)=>{
    e.preventDefault()
  if(filterByDepartment.value){
    getData(1,sort.value,'department',filterByDepartment.value)
  }else if(filterByGender.value){
    getData(1,sort.value,'gender',filterByGender.value)
  }else{
    getData(1,sort.value)
  }
    
    
   })

   filterByDepartment.addEventListener('change',(e)=>{
    e.preventDefault()
  
    filterByGender.value=""
    getData(1,sort.value,'department',filterByDepartment.value)
   

    
   })

   
   filterByGender.addEventListener('change',(e)=>{
    e.preventDefault()
   
    filterByDepartment.value=""
    getData(1,sort.value,'gender',filterByGender.value)
  
})






