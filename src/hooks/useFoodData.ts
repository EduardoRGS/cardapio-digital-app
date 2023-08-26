import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interfaces/FoodData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

// metodo get
const fetchDataGet = async (): AxiosPromise<FoodData[]> => {
    const response = axios.get(API_URL + '/food/listFoods')
    return response;
}

// metodo post
const postData =  async (data: FoodData): AxiosPromise<void> => {
    const response = axios.post(API_URL + '/food/addFood', data)
    return response;
}

export function useFoodData () {
    const query = useQuery({
        queryFn: fetchDataGet,
        queryKey: ['food-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}

export function useFoodAdd () {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])
        }
    })

    return mutate;
}