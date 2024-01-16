
// Login function
        
 let loginform=document.getElementById('loginform')



 loginform.addEventListener('submit',async (e)=>{
    e.preventDefault()
    
    
   
    try {
        let email=document.getElementById('email').value
        let password=document.getElementById('password').value
        
        let obj={
            email,
            password,
        }

        let response= await fetch('https://reqres.in/api/login',{
            method:'POST', headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(obj)}) 
        let data=await response.json()
        if(data?.token){
            localStorage.setItem('token',data.token)
            alert('Login Successfull')
            window.location='./pages/employee.html'
        }else{
            alert(data.error)
        }
        console.log(data) 
    } catch (error) {
        console.log('e'+ error)
        alert('Something error occurred so please try again later')
    }
 })  
 
 