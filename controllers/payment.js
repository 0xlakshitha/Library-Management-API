import Payment from '../models/payment.js'

export const createPayment = async (req, res) => {

    if(!req.user) return res.status(403).json({message: "Please login"})

    const newPayment = new Payment({
        user: req.user.id,
        amount: req.body.amount,
        payment_method: req.body.payment_method
    })

    try {

        const payment = await newPayment.save()

        res.status(201).json(payment)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getPayment = async (req, res) => {
    try {

        const payment = await Payment.findById(req.params.id)

        if(!payment) return res.status(404).json({message: `cannot find any payment with ${req.params.id}`})

        if(req.user.id != payment.user ) {
            if(!req.user.isAdmin) return res.status(403).json({message: 'You are not allowed'})
        }

        res.status(200).json(payment)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getAll = async (req, res) => {
    try {

        let payments = await Payment.find()

        res.status(200).json(payments)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getMyPayments = async (req, res) => {

    if(!req.user) return res.status(403).json({message: "Please login"})

    try {

        let payments = await Payment.find({
            user: req.user.id
        })

        res.status(200).json(payments)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const updatePayment = async (req, res) => {

    try {

        const paymentExist = await Payment.findById(req.params.id)

        if(!paymentExist) {
            return res.status(404).json({msg: `No payment record with ${req.params.id}`})
        }

        const payment = await Payment.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {
            new: true,
            runValidators: true
        })

        res.status(200).json(payment)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)

        if(!payment) {
            return res.status(404).json({msg: `No payment record with ${req.params.id}`})
        }

        await Payment.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'Successfully delete payment'})
    } catch(error) {
        res.status(500).json(error)
    }
}
