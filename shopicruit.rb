require 'net/http'
require 'json'

prices = []

def get_data_by_page(page_number)
  url = "http://shopicruit.myshopify.com/products.json?page=#{page_number}"
  uri = URI(url)
  response = Net::HTTP.get(uri)
  JSON.parse(response)
end

page_number = 1

data = get_data_by_page(page_number)

until data['products'].empty?

  data['products'].each do |product|

    if ['Clock', 'Watch'].include?(product['product_type'])
      product['variants'].each do |variant|
        prices << (variant['taxable'] ? variant['price'].to_i * 1.13 : variant['price'].to_i)
      end
    end

  end

page_number += 1

data = get_data_by_page(page_number)

end


# puts prices
total = prices.inject(:+)

puts "$ #{sprintf('%.2f', total)}"
