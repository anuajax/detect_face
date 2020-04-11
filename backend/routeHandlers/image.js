const handleImage = (req,res,postgresdb)=>{
    const { id } =req.body;
   postgresdb('users').where('id', '=', id)
   .increment('entries',1)
   .returning('entries')
   .then(entries => {
    res.json(entries[0]);
   })
   .catch(err => res.status(400).json("unable to get count"))
}
module.exports = {
    handleImage : handleImage
}