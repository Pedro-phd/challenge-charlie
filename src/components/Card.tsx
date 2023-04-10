
import { useMemo, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import ToggleText from './ToggleText'
import { WeatherData } from '@/domain/models/weather'
import fahrenheitToCelsius from '@/utils/convertTemp'
import Spinner from './Spinner'

type Props = {
    data?: WeatherData
    setState: any
    search: string
    loading: boolean
}

const Card = ({ data, setState, search, loading }: Props) => {

    const [cityName, setCityName] = useState(search)

    const temp = useMemo(() => {
        return {
            first: {
                tempF: data?.current.temp,
                tempC: fahrenheitToCelsius(data?.current.temp || 0),
                wind: data?.current.wind_speed,
                pressure: data?.current.pressure,
                humidity: data?.current.humidity,
                climate: data?.current.weather[0].main
            },
            second: {
                tempF: data?.daily[2].temp.day.toFixed(),
                tempC: fahrenheitToCelsius(data?.daily[2].temp.day || 0)
            },
            third: {
                tempF: data?.daily[3].temp.day.toFixed(),
                tempC: fahrenheitToCelsius(data?.daily[3].temp.day || 0)
            }
        }
    }, [data])

    const handleSearch = (e: any) => {
        e.preventDefault()
        setState((old: any) => ({ ...old, citySearch: cityName }))
        console.log(search)
    }

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSearch} className="flex w-full bg-white p-2 px-4 items-center gap-4">
                <span data-icon="(" className="icon text-2xl text-slate-500" onClick={() => console.log(data)}></span>
                <input
                    value={cityName}
                    className="w-full bg-white h-12 outline-none font-bold text-slate-500"
                    onChange={e => setCityName(e.target.value)}
                />
                <button type="submit">
                    <AiOutlineSearch className="w-8 h-8 cursor-pointer text-slate-500" />
                </button>
            </form>
            {loading && <Spinner />}
            {data &&
                <>
                    <div className="flex w-full justify-center py-8 bg-yellow-500 items-center card">
                        <span data-icon="B" className="icon text-9xl text-white w-1/2 text-center"></span>
                        <div className="w-1/2">
                            <p className="text-white text-lg font-semibold">HOJE</p>
                            <ToggleText first={`${temp.first.tempC}°C`} second={`${temp.first.tempF}°F`} />
                            <p className="text-white text-xl font-semibold my-4">ENSOLARADO</p>
                            <p className="text-white font-medium">Vento: NO 6.4km/h</p>
                            <p className="text-white font-medium">Humidade: 78%</p>
                            <p className="text-white font-medium">Pressão: 100 3hPA</p>
                        </div>
                    </div>
                    <div className="flex w-full h-16 bg-yellow-400 flex-col items-end justify-center card">
                        <div className="w-1/2 text-white">
                            <p className="text-white font-medium">AMANHÃ</p>
                            <ToggleText first={`${temp.second.tempC}°C`} second={`${temp.second.tempF}°F`} />
                        </div>
                    </div>
                    <div className="flex w-full h-16 bg-yellow-700 flex-col items-end justify-center card">
                        <div className="w-1/2 text-white">
                            <p className="text-white font-medium">DEPOIS DE AMANHÃ</p>
                            <ToggleText first={`${temp.third.tempC}°C`} second={`${temp.third.tempF}°F`} />
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default Card