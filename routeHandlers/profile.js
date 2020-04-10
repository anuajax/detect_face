const handleProfile = (req,res,postgresdb)=>{
    const { id } =req.params;
    postgresdb.select('*').from('users').where({
      id: id
    })
    .then(user => { if(user.length)
                    res.json(user[0]);
                    else  res.status(400).json("not found");
    })
  
    .catch(err => res.status(400).json("err getting user"));
}
module.exports ={
    handleProfile: handleProfile
}