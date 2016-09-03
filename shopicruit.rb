require 'net/http'
require 'json'

def get_data_by_page(page_number)
  url = "http://shopicruit.myshopify.com/products.json?page=#{page_number}"
  uri = URI(url)
  response = Net::HTTP.get(uri)
  JSON.parse(response)
end

def get_data_from_all_pages
  prices = []
  page_number = 1
  data = get_data_by_page(page_number)

  until data['products'].empty?
    data = get_data_by_page(page_number)
    data['products'].each do |product|

      if ['Clock', 'Watch'].include?(product['product_type'])
        product['variants'].each do |variant|
          prices << (variant['taxable'] ? variant['price'].to_f * 1.13 : variant['price'].to_f)
        end
      end

    end
  page_number += 1
  end
  return prices
end

def print_result(price_array)
  total = price_array.inject(:+)
  total_in_currency = sprintf('%.2f', total)
  return total_in_currency
end
# puts prices
puts print_result(get_data_from_all_pages)
