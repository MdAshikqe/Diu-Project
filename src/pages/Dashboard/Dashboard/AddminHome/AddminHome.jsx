import React, { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { FaBook, FaDollarSign, FaUser } from 'react-icons/fa';
import { FaJediOrder } from 'react-icons/fa6';
import useAxiosSecurePublic from '../../../../Hooks/useAxiosSecurePublic';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,PieChart, Pie, Sector,ResponsiveContainer, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AddminHome = () => {
    const {users}=useContext(AuthContext);
    const axiosSecurePublic= useAxiosSecurePublic();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecurePublic.get('/admin-stats');
            return res.data;
        }
    });
    //data bar-chart fake
    const data = [
        {
          name: 'Sneaker',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Pants',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: "Boot",
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Bag',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Bottle',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Cap',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Earphones',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

      //data pie-char fake
      const data2 = [
        { name: 'Earphones', value: 400 },
        { name: 'Cap', value: 300 },
        { name: 'Bag', value: 450 },
        { name: 'Boots', value: 200 },
        { name: 'Pants', value: 400 },
        { name: 'Sneaker', value: 350 },
      ];

    //coustum with bar-chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

      //custom pie chat
      const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

    return (
        <div>
            <h2 className="text-3xl font-bold text-green-600">
            <span>Hi,Welcome </span>
            {
                users?.displayName ? users?.displayName : 'Back'
            }
            </h2>
            <div className="stats stats-vertical lg:stats-horizontal shadow my-6 lg:flex justify-center">
  <div className="stat ">
    <div className="stat-figure text-secondary">
    <FaDollarSign className='text-3xl'></FaDollarSign>
    </div>
    <div className="stat-title">Revenue</div>
    <div className="stat-value">$ {stats.revenue}</div>
    <div className="stat-desc">Jan 1st - Dec 1st</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
        <FaUser className='text-3xl'></FaUser>
      
    </div>
    <div className="stat-title">All Users</div>
    <div className="stat-value">{stats.usersAll}</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
        <FaBook className='text-3xl'></FaBook>
      
    </div>
    <div className="stat-title">Products</div>
    <div className="stat-value">{stats.productItems}</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <FaJediOrder className='text-3xl'></FaJediOrder>
    </div>
    <div className="stat-title">Order</div>
    <div className="stat-value">{stats.orders}</div>

  </div>
  

               
</div>
<div className="flex justify-center items-center">
                    <div className="w-1/2">
        <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
                    </div>
                    <div className="w-1/2">
                    <PieChart width={400} height={400}>
          <Pie
            data={data2}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
                    </div>
                </div>

           
        </div>
    );
};

export default AddminHome;