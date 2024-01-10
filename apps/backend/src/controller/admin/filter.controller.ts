import { Request, Response } from 'express'
import { createFilter, findFilters } from '../../service/admin/filter.service'

// create a filter handller
export async function createFilterHandler(req: Request, res: Response) {
    try {
        const filter = await createFilter(req.body)
        return res.status(200).send({
            message: 'Filter updated successfully',
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}

// find all filters handller
export async function findFiltersHandler(req: Request, res: Response) {
    try {
        const filters = await findFilters()
        if (!filters) {
            return res.status(404).send({
                message: 'Sorry No filters Created yet',
            })
        }
        res.status(200).send({
            message: 'Successfully find all filters',
            data: filters,
        })
    } catch (e: any) {
        return res.status(500).send({
            message: 'Server Error',
            error: e.message,
        })
    }
}